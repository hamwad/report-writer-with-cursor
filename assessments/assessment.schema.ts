import { pgTable, serial, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const assessmentOutcomes = pgTable('assessment_outcomes', {
  id: serial('id').primaryKey(),
  subject: text('subject').notNull(), // 'math' or 'english'
  label: text('label').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const assessments = pgTable('assessments', {
  id: serial('id').primaryKey(),
  studentId: text('student_id').notNull(),
  teacherId: text('teacher_id').notNull(),
  subject: text('subject').notNull(), // 'math' or 'english'
  assessmentData: jsonb('assessment_data').notNull(), // Will store the assessment values for each outcome
  aiGeneratedComment: text('ai_generated_comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 