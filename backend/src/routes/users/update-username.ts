import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { users } from '@/db/schema.ts'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request.ts'
export const updateUsername: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/username',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Users'],
        summary: 'update username',
        security: [
          { bearerAuth: [] }, 
        ],
        body: z.object({
          username: z.string().min(5).max(255),
        }),
      },
    },
    async (request, reply) => {
      const userId = getAuthenticatedUserFromRequest(request).sub
      const { username } = request.body

      await db
        .update(users)
        .set({
          username,
        })
        .where(eq(users.id, userId))

      reply.status(200).send({
        message: 'User name atualizado com sucesso!',
      })
    },
  )
}
