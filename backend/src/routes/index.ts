import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { login } from './auth/login'
import { register } from './auth/register'
import { createTask } from './tasks/create-task'
import { listTasks } from './tasks/list-task'
import { completeTask } from './tasks/complete-task'

export const registerRoutes: FastifyPluginAsyncZod = async (app) => {
  app.register(register, { prefix: '/auth' })
  app.register(login, { prefix: '/auth' })

  app.register(createTask, { prefix: '/tasks' })
  app.register(listTasks, { prefix: '/tasks' })
  app.register(completeTask, { prefix: '/tasks' })
}
