import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '@/db/client'
import { users } from '@/db/schema'
import { checkRequestJWT } from '@/middleware/check-request-jwt'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request'
export const getUserProfile: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/profile',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Users'],
        summary: 'get  user profile',
      },
    },
    async (request, reply) => {
      const userId = getAuthenticatedUserFromRequest(request).sub

      const result = await db
        .select({
          username: users.username,
          email: users.email,
          createAt: users.createAt,
          updateAt: users.updateAt,
        })
        .from(users)
        .where(eq(users.id, userId))

      reply.status(200).send({ user: result[0] })
    },
  )
}
