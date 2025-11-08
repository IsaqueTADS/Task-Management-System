import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { v7 as uuidv7 } from 'uuid'

export const users = mysqlTable('users', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  username: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at').onUpdateNow().defaultNow().notNull(),
})

export const tasks = mysqlTable('tasks', {
  id: varchar({ length: 36 })
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  completed: boolean().default(false),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at').onUpdateNow().defaultNow().notNull(),
})
