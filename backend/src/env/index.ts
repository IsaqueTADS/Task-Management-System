import { z } from 'zod'

const evnSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

const _env = evnSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:')
  console.error(JSON.stringify(_env.error.format(), null, 2))
  throw new Error('Environment validation failed. Please check your .env file.')
}

export const env = _env.data
