import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import type { FastifyRequest } from 'fastify'
import { v7 as uuiv7 } from 'uuid'

const pump = promisify(pipeline)

export async function uploadSingleImage(
  request: FastifyRequest,
  subPasta: string,
) {
  let url = ''
  let newFileName = ''
  for await (const part of request.parts()) {
    if (part.type === 'file') {
      if (!part.file) {
        return { error: 'Nenhum arquivo enviado.' }
      }

      const dirUpload = join(process.cwd(), 'uploads', subPasta)

      if (!existsSync(dirUpload)) {
        mkdirSync(dirUpload, { recursive: true })
      }
      const ext = part.filename.split('.').pop()
      newFileName = `taskmanagement-${uuiv7()}.${ext}`

      const filePath = join(dirUpload, newFileName)

      console.log(filePath)

      const writeStream = createWriteStream(filePath)

      await pump(part.file, writeStream)

      url = `/uploads/${subPasta}/${newFileName}`
    } else {
      console.log('Field:', part.fieldname, part.value)
    }
  }

  return { url }
}
