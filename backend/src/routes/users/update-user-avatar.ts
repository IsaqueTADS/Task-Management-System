import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { users } from '@/db/schema.ts'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
import { deleteFileAsync } from '@/utils/delete-file-async.ts'
import { getAuthenticatedUserFromRequest } from '@/utils/get-authenticated-user-from-request.ts'
import { uploadSingleImage } from '@/utils/upload-single-image.ts'

export const updateUserAvatar: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/avatar',
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ['Users'],
        summary: 'update user avatar',
        consumes: ['multipart/form-data'],
        response: {
          200: z.void(),
        },
      },
    },
    async (request, reply) => {
      const userId = getAuthenticatedUserFromRequest(request).sub
      const { url } = await uploadSingleImage(request, {
        subFolder: 'profiles',
      })

      const result = await db
        .select({ id: users.id, avatarUrl: users.avatarUrl })
        .from(users)
        .where(eq(users.id, userId))
      const user = result[0]

      if (user.avatarUrl) {
        await deleteFileAsync(user.avatarUrl)
      }

      await db.update(users).set({ avatarUrl: url }).where(eq(users.id, userId))

      reply.status(200).send()
    },
  )
}
