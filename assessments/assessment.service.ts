import { db } from "../users/database";
import { assessmentOutcomes, assessments } from "./assessment.schema";
import {
  CreateAssessmentInput,
  CreateAssessmentOutcomeInput,
} from "./assessment.interface";
import { eq, and, isNull } from "drizzle-orm";

export class AssessmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssessmentError";
  }
}

export class AssessmentService {
  async createAssessmentOutcome(input: CreateAssessmentOutcomeInput) {
    if (!input.label || !input.description) {
      throw new AssessmentError("Label and description are required");
    }

    if (!["math", "english"].includes(input.subject)) {
      throw new AssessmentError("Subject must be either math or english");
    }

    const [outcome] = await db
      .insert(assessmentOutcomes)
      .values(input)
      .returning();
    return outcome;
  }

  async getAssessmentOutcomes(subject?: "math" | "english") {
    const query = db.select().from(assessmentOutcomes);
    if (subject) {
      if (!["math", "english"].includes(subject)) {
        throw new AssessmentError("Subject must be either math or english");
      }
      query.where(eq(assessmentOutcomes.subject, subject));
    }
    return query;
  }

  async createAssessment(input: CreateAssessmentInput) {
    // Validate input
    if (!input.studentId || !input.teacherId) {
      throw new AssessmentError("Student ID and Teacher ID are required");
    }

    if (!["math", "english"].includes(input.subject)) {
      throw new AssessmentError("Subject must be either math or english");
    }

    // Get and validate outcomes
    const outcomes = await this.getAssessmentOutcomes(input.subject);
    if (!Array.isArray(outcomes)) {
      throw new AssessmentError("Failed to fetch assessment outcomes");
    }

    const outcomeIds = new Set(outcomes.map((o) => o.id));

    // Validate assessment data
    for (const [outcomeId, value] of Object.entries(input.assessmentData)) {
      if (!outcomeIds.has(Number(outcomeId))) {
        throw new AssessmentError(`Invalid outcome ID: ${outcomeId}`);
      }
      if (typeof value !== "number" || value < 0 || value > 5) {
        throw new AssessmentError(
          `Invalid assessment value for outcome ${outcomeId}. Must be between 0 and 5`
        );
      }
    }

    // Generate AI comment
    const aiComment = await this.generateAIComment(input, outcomes);

    // Create the assessment
    try {
      const [assessment] = await db
        .insert(assessments)
        .values({
          ...input,
          aiGeneratedComment: aiComment,
        })
        .returning();
      return assessment;
    } catch (error) {
      throw new AssessmentError(
        "Failed to create assessment: " + (error as Error).message
      );
    }
  }

  private async generateAIComment(
    assessment: CreateAssessmentInput,
    outcomes: Array<{ id: number; label: string; description: string }>
  ): Promise<string> {
    try {
      const prompt = this.constructPrompt(assessment, outcomes);

      // TODO: Integrate with your preferred AI service
      // For now, returning a placeholder
      return `AI-generated comment based on assessment data for ${assessment.subject}`;
    } catch (error) {
      throw new AssessmentError(
        "Failed to generate AI comment: " + (error as Error).message
      );
    }
  }

  private constructPrompt(
    assessment: CreateAssessmentInput,
    outcomes: Array<{ id: number; label: string; description: string }>
  ): string {
    const outcomeDetails = outcomes
      .map((outcome) => {
        const value = assessment.assessmentData[outcome.id];
        return `${outcome.label}: ${value}\nDescription: ${outcome.description}`;
      })
      .join("\n\n");

    return `Generate a professional and constructive comment for a student report card based on the following assessment data for ${assessment.subject}:

${outcomeDetails}

Please provide a well-structured comment that:
1. Highlights the student's strengths
2. Identifies areas for improvement
3. Suggests specific strategies for growth
4. Maintains a positive and encouraging tone

The comment should be suitable for a formal report card and approximately 150-200 words in length.`;
  }

  async getAssessments(studentId?: string, teacherId?: string) {
    const query = db.select().from(assessments);

    if (studentId) {
      query.where(eq(assessments.studentId, studentId));
    }
    if (teacherId) {
      query.where(eq(assessments.teacherId, teacherId));
    }

    return query;
  }
}
