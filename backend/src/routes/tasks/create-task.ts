import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { tasks } from '@/db/schema.ts'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request.ts'

export const createTask: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Tasks'],
        summary: 'create task',
        security: [{ bearerAuth: [] }],
        body: z
          .object({
            title: z.string().min(5).max(255),
            description: z.string().max(500),
          })
          .strict(),
        response: {
          201: z.object({
            taskId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = getAuthenticatedUserFromRequest(request).sub
      const { title, description } = request.body

      const task = await db
        .insert(tasks)
        .values({
          title,
          userId,
          description,
        })
        .$returningId()

      return reply.status(201).send({ taskId: task[0].id })
    },
  )
}
