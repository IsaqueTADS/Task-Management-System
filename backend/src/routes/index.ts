import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { register } from './auth/register'

export const registerRoutes: FastifyPluginAsyncZod = async (app) => {
  app.register(register, { prefix: '/auth' })
}
