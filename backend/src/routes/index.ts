import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { login } from './auth/login.ts'
import { register } from './auth/register.ts'
import { completeTask } from './tasks/complete-task.ts'
import { createTask } from './tasks/create-task.ts'
import { deleteTask } from './tasks/delete-task.ts'
import { incompleteTask } from './tasks/incomplete-task.ts'
import { listTasks } from './tasks/list-task.ts'
import { updateTask } from './tasks/update-task.ts'
import { getUserProfile } from './users/get-user-profile.ts'
import { updateUserAvatar } from './users/update-user-avatar.ts'
import { updateUsername } from './users/update-username.ts'

export const registerRoutes: FastifyPluginAsyncZod = async (app) => {
  app.register(register, { prefix: '/auth' })
  app.register(login, { prefix: '/auth' })

  app.register(createTask, { prefix: '/tasks' })
  app.register(listTasks, { prefix: '/tasks' })
  app.register(completeTask, { prefix: '/tasks' })
  app.register(incompleteTask, { prefix: '/tasks' })
  app.register(updateTask, { prefix: '/tasks' })
  app.register(deleteTask, { prefix: '/tasks' })

  app.register(getUserProfile, { prefix: '/users' })
  app.register(updateUsername, { prefix: '/users' })
  app.register(updateUserAvatar, { prefix: '/users' })
}
