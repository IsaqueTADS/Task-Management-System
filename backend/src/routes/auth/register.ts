import argon2 from 'argon2'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { users } from '@/db/schema.ts'

export const register: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'register user',
        body: z
          .object({
            username: z.string().min(5).max(255),
            email: z.email().min(5).max(255),
            password: z.string().min(8).max(255),
          })
          .strict(),
        response: {
          409: z.object({
            message: z.string().describe('Esse email já está em uso!'),
          }),
          201: z.object({
            id: z.uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { username, email, password } = request.body

      const userExist = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

      if (userExist.length !== 0) {
        return reply.status(409).send({ message: 'Esse email já está em uso!' })
      }

      const passwordHash = await argon2.hash(password)

      const result = await db
        .insert(users)
        .values({
          username,
          email,
          passwordHash,
        })
        .$returningId()

      reply.status(201).send(result[0])
    },
  )
}
