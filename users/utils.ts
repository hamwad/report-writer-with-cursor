import { Paginated } from "./user.interface";

type PaginatedParams = {
  size: number;
  page: number;
  count: number;
};

export const getOffset = (page: number, size: number): number => {
  return size * (page - 1);
};

export const paginatedData = (params?: PaginatedParams): Paginated => {
  const response = {
    current: params?.page ?? 1,
    pageSize: params?.size ?? 20,
    totalPages: params ? Math.ceil(params?.count / params?.size) : 1,
    count: params?.count ?? 0,
  };
  return response;
};
