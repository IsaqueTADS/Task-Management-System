import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { login } from './auth/login'
import { register } from './auth/register'

export const registerRoutes: FastifyPluginAsyncZod = async (app) => {
  app.register(register, { prefix: '/auth' })
  app.register(login, { prefix: '/auth' })
}
