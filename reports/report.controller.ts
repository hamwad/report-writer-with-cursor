import { ReportService } from "./report.service";
import { CreateReportInput, UpdateReportInput } from "./report.interface";

const reportService = new ReportService();

export async function createReport(input: CreateReportInput) {
  return await reportService.createReport(input);
}

export async function updateReport(input: UpdateReportInput) {
  return await reportService.updateReport(input);
}

export async function getReports(
  studentId?: string,
  teacherId?: string,
  term?: string
) {
  return await reportService.getReports(studentId, teacherId, term);
}

export async function getReport(id: number) {
  return await reportService.getReport(id);
}
