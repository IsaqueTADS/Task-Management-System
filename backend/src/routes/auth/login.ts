import argon2 from 'argon2'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { db } from '@/db/client'
import { users } from '@/db/schema'
import { env } from '@/env'

export const login: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'login user',
        body: z
          .object({
            email: z.email().min(5).max(255),
            password: z.string().min(8).max(255),
          })
          .strict(),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string().describe('Credenciais inválidas!'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userExist = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

      if (userExist.length === 0) {
        return reply.status(400).send({ message: 'Credenciais inválidas!' })
      }

      const user = userExist[0]

      const passwordValid = await argon2.verify(user.passwordHash, password)

      if (!passwordValid) {
        return reply.status(400).send({ message: 'Credenciais inválidas!' })
      }

      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
        expiresIn: '3h',
      })

      reply.status(200).send({ token })
    },
  )
}
