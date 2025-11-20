import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request.ts'

export const valdiateToken: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/token/validate',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Auth'],
        summary: 'validate token',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            success: z.boolean(),
            user: z.object({ id: z.uuid() }),
          }),
          401: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { sub } = getAuthenticatedUserFromRequest(request)
      reply.status(200).send({
        success: true,
        user: {
          id: sub,
        },
      })
    },
  )
}
