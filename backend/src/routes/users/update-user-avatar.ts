import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db/client.ts'
import { users } from '@/db/schema.ts'
import { checkRequestJWT } from '@/middleware/check-request-jwt.ts'
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
      },
    },
    async (request, reply) => {
      const userId = getAuthenticatedUserFromRequest(request).sub
      console.log('teste')
      const { url } = await uploadSingleImage(request, 'profiles')

      reply.status(200).send({ url })
    },
  )
}
