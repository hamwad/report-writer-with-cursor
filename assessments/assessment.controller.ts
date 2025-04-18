import { AssessmentService } from "./assessment.service";
import {
  CreateAssessmentInput,
  CreateAssessmentOutcomeInput,
} from "./assessment.interface";

const assessmentService = new AssessmentService();

export async function createAssessmentOutcome(
  input: CreateAssessmentOutcomeInput
) {
  return await assessmentService.createAssessmentOutcome(input);
}

export async function getAssessmentOutcomes(subject?: "math" | "english") {
  return await assessmentService.getAssessmentOutcomes(subject);
}

export async function createAssessment(input: CreateAssessmentInput) {
  return await assessmentService.createAssessment(input);
}

export async function getAssessments(studentId?: string, teacherId?: string) {
  return await assessmentService.getAssessments(studentId, teacherId);
}
