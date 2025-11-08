import type { FastifyRequest } from 'fastify/types/request'

export function getAuthenticatedUserFromRequest(request: FastifyRequest) {
  const user = request.user

  if (!user) {
    throw new Error('Invalid authentication')
  }

  return user
}
