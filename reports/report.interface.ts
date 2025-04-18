import { BaseEntity, Subject, UserReference } from "../shared/types/common";

export interface Report extends BaseEntity, UserReference {
  term: string;
  reportData: {
    assessments: {
      subject: Subject;
      outcomes: {
        id: number;
        label: string;
        value: number;
      }[];
      comment: string;
    }[];
    generalComment?: string;
  };
  status: "draft" | "published";
  publishedAt?: Date;
}

export interface CreateReportInput extends UserReference {
  term: string;
  reportData: {
    assessments: {
      subject: Subject;
      outcomes: {
        id: number;
        label: string;
        value: number;
      }[];
      comment: string;
    }[];
    generalComment?: string;
  };
}

export interface UpdateReportInput {
  id: number;
  reportData?: {
    assessments?: {
      subject: Subject;
      outcomes: {
        id: number;
        label: string;
        value: number;
      }[];
      comment: string;
    }[];
    generalComment?: string;
  };
  status?: "draft" | "published";
}
