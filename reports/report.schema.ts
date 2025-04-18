import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").notNull(),
  teacherId: text("teacher_id").notNull(),
  term: text("term").notNull(), // e.g., "Term 1 2024"
  reportData: jsonb("report_data").notNull(), // Will store the compiled report data including assessments and comments
  status: text("status").notNull().default("draft"), // draft, published
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
