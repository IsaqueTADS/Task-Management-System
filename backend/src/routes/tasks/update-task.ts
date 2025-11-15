import { and, eq} from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { tasks } from '@/db/schema.ts'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request.ts'

export const updateTask: FastifyPluginAsyncZod = async (app) => {
  app.put(
    '/:taskId',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Tasks'],
        summary: 'update task',
        security: [{ bearerAuth: [] }],
        params: z.object({
          taskId: z.string(),
        }),
        body: z.object({
          title: z.string().min(5).max(255),
          description: z.string().max(500).optional(),
        }),
        response: {
          404: z.object({
            message: z.string().describe('Task não encontrada!'),
          }),
          200: z.object({
            message: z.string().describe('Task atualizada com sucesso!'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { taskId } = request.params
      const { title, description } = request.body
      const userId = getAuthenticatedUserFromRequest(request).sub

      const taskExist = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))

      if (taskExist.length === 0) {
        return reply.status(404).send({ message: 'Task não encontrada!' })
      }

      const bodyUpdateTasks: Record<string, string> = {}

      bodyUpdateTasks.title = title

      if (description !== undefined) {
        bodyUpdateTasks.description = description
      }

      await db
        .update(tasks)
        .set(bodyUpdateTasks)
        .where(and(eq(tasks.userId, userId), eq(tasks.id, taskId)))

      reply.status(200).send({ message: 'Task atualizada com sucesso!' })
    },
  )
}
