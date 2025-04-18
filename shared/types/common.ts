export type Subject = "math" | "english";

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserReference {
  studentId: string;
  teacherId: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
