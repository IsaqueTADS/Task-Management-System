import { unlink } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function deleteFileAsync(relativePath: string) {
  const fullPath = join(__dirname, '..', '..', relativePath)

  try {
    await unlink(fullPath)
  } catch (error: unknown) {
    if (error instanceof Error) {
      const err = error as NodeJS.ErrnoException
      if (err.code === 'ENOENT') {
        console.log('Arquivo não existente')
        return
      }
    }

    throw error
  }
}
