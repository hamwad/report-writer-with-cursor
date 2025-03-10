import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.text().unique().primaryKey(),
  name: p.text().notNull(),
  surname: p.text().notNull(),
});
