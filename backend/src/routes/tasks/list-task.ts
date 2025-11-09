import { and, asc, desc, eq, like, type SQL } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client'
import { tasks } from '@/db/schema'
import { checkRequestJWT } from '@/middleware/check-request-jwt'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request'

export const listTasks: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Tasks'],
        summary: 'list tasks',
        querystring: z
          .object({
            search: z.string().optional(),
            page: z.coerce.number().optional().default(1),
            limit: z.coerce.number().optional().default(10),
            completed: z.enum(['false', 'true']).optional(),
            orderBy: z
              .enum(['title', 'id', 'createAt', 'updateAt'])
              .optional()
              .default('id'),
          })
          .strict(),

        response: {
          200: z.object({
            tasks: z.array(
              z.object({
                id: z.uuid(),
                userId: z.uuid(),
                title: z.string(),
                description: z.string().nullable(),
                completed: z.boolean().nullable(),
                createAt: z.date(),
                updateAt: z.date(),
              }),
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = getAuthenticatedUserFromRequest(request).sub
      const { search, page, limit, completed, orderBy } = request.query

      const conditions: SQL[] = []

      if (search) {
        conditions.push(like(tasks.title, `%${search}%`))
      }

      if (completed !== undefined) {
        console.log(completed)
        conditions.push(eq(tasks.completed, completed === 'true'))
      }

      conditions.push(eq(tasks.userId, userId))

      const [userTasks, total] = await Promise.all([
        db
          .select()
          .from(tasks)
          .where(and(...conditions))
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(desc(tasks[orderBy])),

        db.$count(tasks, and(...conditions)),
      ])

      return reply.status(200).send({ tasks: userTasks, total })
    },
  )
}
