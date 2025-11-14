import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pipeline } from 'node:stream'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import type { FastifyRequest } from 'fastify'
import { v7 as uuidv7 } from 'uuid'

const pump = promisify(pipeline)

const __dirname = dirname(fileURLToPath(import.meta.url))

interface UploadOptions {
  allowedExtensions?: string[]
  subFolder: string
}

interface UploadResult {
  success: boolean
  url?: string
  fileName?: string
  error?: string
  details?: string
}

export async function uploadSingleImage(
  request: FastifyRequest,
  options: UploadOptions,
): Promise<UploadResult> {
  const { allowedExtensions = ['jpg', 'jpeg', 'png'], subFolder } = options

  let fileCount = 0
  let filePath = ''

  try {
    for await (const part of request.parts()) {
      if (part.type === 'field') {
        console.log('Field:', part.fieldname, part.value)
        continue
      }

      fileCount++
      if (fileCount > 1) {
        return {
          success: false,
          error: 'Apenas um arquivo é permitido por upload.',
        }
      }

      if (!part.file) {
        return {
          success: false,
          error: 'Nenhum arquivo enviado.',
        }
      }

      const ext = part.filename.split('.').pop()?.toLowerCase()
      if (!ext || !allowedExtensions.includes(ext)) {
        return {
          success: false,
          error: `Extensão não permitida. Permitidas: ${allowedExtensions.join(', ')}`,
          details: `Arquivo enviado: ${part.filename}`,
        }
      }

      const dirUpload = join(__dirname, '..', '..', 'uploads', subFolder)

      if (!existsSync(dirUpload)) {
        mkdirSync(dirUpload, { recursive: true })
      }

      const newFileName = `taskmanagement-${uuidv7()}.${ext}`
      filePath = join(dirUpload, newFileName)

      const writeStream = createWriteStream(filePath)

      try {
        await pump(part.file, writeStream)

        const url = `/uploads/${subFolder}/${newFileName}`
        return {
          success: true,
          url,
          fileName: newFileName,
        }
      } catch (error) {
        if (existsSync(filePath)) {
          unlinkSync(filePath)
        }
        throw error
      }
    }

    return {
      success: false,
      error: 'Nenhum arquivo foi enviado na requisição.',
    }
  } catch (error) {
    if (filePath && existsSync(filePath)) {
      unlinkSync(filePath)
    }

    return {
      success: false,
      error: 'Erro ao fazer upload do arquivo.',
      details: error instanceof Error ? error.message : String(error),
    }
  }
}
