import type { FastifyRequest } from 'fastify/types/request.ts'

export function getAuthenticatedUserFromRequest(request: FastifyRequest) {
  const user = request.user

  if (!user) {
    throw new Error('Invalid authentication')
  }

  return user
}

