import { BaseEntity, Subject, UserReference } from "../shared/types/common";

export interface AssessmentOutcome extends BaseEntity {
  subject: Subject;
  label: string;
  description: string;
}

export interface Assessment extends BaseEntity, UserReference {
  subject: Subject;
  assessmentData: {
    [outcomeId: number]: number;
  };
  aiGeneratedComment?: string;
}

export interface CreateAssessmentOutcomeInput {
  subject: Subject;
  label: string;
  description: string;
}

export interface CreateAssessmentInput extends UserReference {
  subject: Subject;
  assessmentData: {
    [outcomeId: number]: number;
  };
}
