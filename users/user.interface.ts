export interface UserDto {
  id: string;
  name: string;
  surname: string;
}

export interface CreateUserDto {
  name: string;
  surname: string;
}

export interface UpdateUserDto {
  name?: string;
  surname?: string;
}

export interface Response {
  success: boolean;
  message?: string;
  result?: string | number;
}

export interface Paginated {
  count: number;
  pageSize: number;
  totalPages: number;
  current: number;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  result?: UserDto[];
  pagination?: Paginated;
}
