import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      provider: 'v8', // ou 'istanbul' se preferir usar `nyc`
      reporter: ['text', 'json', 'html'], // Relatórios de cobertura
      all: true, // Cobrir todos os arquivos, mesmo os não testados
      include: ['src/repositories/**/*.ts'], // Arquivos a serem incluídos na cobertura
      exclude: ['node_modules', 'build'], // Excluir diretórios ou arquivos específicos
    },
  },
})
