import {
  CreateUserDto,
  UpdateUserDto,
  Response,
  UserResponse,
} from "./user.interface";
import { users } from "./schema";
import { db } from "./database";
import { eq, asc } from "drizzle-orm";
import { getOffset, paginatedData } from "./utils";
import { v4 as uuidv4 } from "uuid";

const UserService = {
  count: async (): Promise<number> => {
    return db.$count(users);
  },

  create: async (data: CreateUserDto): Promise<UserResponse> => {
    const id = uuidv4();
    const [user] = await db
      .insert(users)
      .values({ id, ...data })
      .returning();
    return {
      success: true,
      result: [user],
    };
  },

  update: async (id: string, data: UpdateUserDto): Promise<UserResponse> => {
    const [updateUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    if (!updateUser) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      result: [updateUser],
    };
  },

  find: async (page?: number, limit?: number): Promise<UserResponse> => {
    let pagination: any = undefined;
    let result: any[] = [];
    if (page && limit) {
      const offset = getOffset(page, limit);
      result = await db
        .select()
        .from(users)
        .orderBy(asc(users.name)) // `orderBy` is mandatory
        .limit(limit) // the number of rows to return
        .offset(offset);
      const total = await db.$count(users);
      pagination = paginatedData({ size: limit, page, count: total });
    } else {
      result = await db.select().from(users);
    }
    return {
      success: true,
      result,
      pagination,
    };
  },

  findOne: async (id: string): Promise<UserResponse> => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      result: [user],
    };
  },

  delete: async (id: string): Promise<Response> => {
    const user = await db.delete(users).where(eq(users.id, id)).returning();
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      result: "User deleted successfully",
    };
  },
};

export default UserService;
