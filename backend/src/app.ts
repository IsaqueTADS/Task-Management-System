import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fastifyCors } from '@fastify/cors'
import FastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { fastifySwagger } from '@fastify/swagger'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env/index.ts'
import { registerRoutes } from './routes/index.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dirUploads = join(__dirname, '..', 'uploads')

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

export const app = fastify({
  logger: envToLogger[env.NODE_ENV] ?? true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

if (!existsSync(dirUploads)) {
  mkdirSync(dirUploads, {
    recursive: true,
  })
}

app.register(fastifyStatic, {
  root: dirUploads,
  prefix: '/uploads/',
})
app.register(FastifyMultipart, {
  limits: {
    fileSize: 29 * 1024 * 1024, // 29 MB
    files: 1,
    fields: 1,
  },
})

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  // credentials: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Task Management System API',
      description:
        'API RESTful para gerenciamento de tarefas, permitindo criação, edição, conclusão, listagem e exclusão de tarefas',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'bluePlanet',
  },
})

app.register(registerRoutes)
