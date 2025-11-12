import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { login } from './auth/login'
import { register } from './auth/register'
import { completeTask } from './tasks/complete-task'
import { createTask } from './tasks/create-task'
import { deleteTask } from './tasks/delete-task'
import { incompleteTask } from './tasks/incomplete-task'
import { listTasks } from './tasks/list-task'
import { updateTask } from './tasks/update-task'
import { getUserProfile } from './users/get-user-profile'
import { updateUsername } from './users/update-username'

export const registerRoutes: FastifyPluginAsyncZod = async (app) => {
  app.register(register, { prefix: '/auth' })
  app.register(login, { prefix: '/auth' })

  app.register(createTask, { prefix: '/tasks' })
  app.register(listTasks, { prefix: '/tasks' })
  app.register(completeTask, { prefix: '/tasks' })
  app.register(incompleteTask, { prefix: '/tasks' })
  app.register(updateTask, { prefix: '/tasks' })
  app.register(deleteTask, { prefix: '/tasks' })

  app.register(getUserProfile, {prefix: "/users"})
  app.register(updateUsername, {prefix: "/users"})
}
