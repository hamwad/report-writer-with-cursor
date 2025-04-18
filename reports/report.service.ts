import { db } from "../users/database";
import { reports } from "./report.schema";
import { CreateReportInput, UpdateReportInput } from "./report.interface";
import { eq } from "drizzle-orm";

export class ReportService {
  async createReport(input: CreateReportInput) {
    const [report] = await db
      .insert(reports)
      .values({
        ...input,
        status: "draft",
      })
      .returning();
    return report;
  }

  async updateReport(input: UpdateReportInput) {
    const updateData: any = { ...input };
    delete updateData.id;

    if (input.status === "published") {
      updateData.publishedAt = new Date();
    }

    const [report] = await db
      .update(reports)
      .set(updateData)
      .where(eq(reports.id, input.id))
      .returning();
    return report;
  }

  async getReports(studentId?: string, teacherId?: string, term?: string) {
    const query = db.select().from(reports);

    if (studentId) {
      query.where(eq(reports.studentId, studentId));
    }
    if (teacherId) {
      query.where(eq(reports.teacherId, teacherId));
    }
    if (term) {
      query.where(eq(reports.term, term));
    }

    return query;
  }

  async getReport(id: number) {
    const [report] = await db.select().from(reports).where(eq(reports.id, id));
    return report;
  }

  async generateGeneralComment(reportData: any): Promise<string> {
    // TODO: Integrate with AI service to generate a general comment
    // This should analyze all assessment data and generate a comprehensive comment
    return `General comment based on all assessments`;
  }
}
