import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { tasks } from '@/db/schema.ts'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request.ts'

export const completeTask: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/:taskId/complete',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Tasks'],
        summary: 'complete task',
        security: [{ bearerAuth: [] }],
        params: z.object({
          taskId: z.string(),
        }),
        response: {
          404: z.object({
            message: z.string().describe('Task não encontrada!'),
          }),
          200: z
            .object({ message: z.string() })
            .describe('Task concluída com sucesso'),
        },
      },
    },
    async (request, reply) => {
      const { taskId } = request.params
      const userId = getAuthenticatedUserFromRequest(request).sub

      const taskExist = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))

      if (taskExist.length === 0) {
        return reply.status(404).send({ message: 'Task não encontrada!' })
      }

      await db
        .update(tasks)
        .set({ completed: true })
        .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))

      reply.status(200).send({ message: 'Task concluída com sucesso' })
    },
  )
}
