import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client'
import { tasks } from '@/db/schema'
import { checkRequestJWT } from '@/middleware/check-request-jwt'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request'

export const incompleteTask: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/:taskId/incomplete',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Tasks'],
        summary: 'incomplete task',
        params: z.object({
          taskId: z.string(),
        }),
        response: {
          404: z.object({
            message: z.string().describe('Task não encontrada!'),
          }),
          200: z
            .object({ message: z.string() })
            .describe('Tarefa marcada como incompleta com sucesso'),
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
        .set({ completed: false })
        .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))

      reply
        .status(200)
        .send({ message: 'Tarefa marcada como incompleta com sucesso' })
    },
  )
}
