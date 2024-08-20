import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
