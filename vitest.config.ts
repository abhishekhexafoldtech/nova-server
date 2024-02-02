import { resolve } from 'path'
import fs from 'fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const NuxtTsConfig = (fs.readFileSync('./.nuxt/tsconfig.json')).toString()
const tsConfigFormated = JSON.parse(NuxtTsConfig
  .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? '' : m))

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {}

try {
  if (tsConfigFormated.compilerOptions.paths) {
    Object.entries(tsConfigFormated.compilerOptions.paths)
      .forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          alias[key] = r(value[0]);
        } else {
          console.error(`Invalid path for alias '${key}': ${value}`);
        }
      });
  }
} catch (error) {
  console.error('Error processing tsConfigFormated.compilerOptions.paths:', error);
}


export default defineConfig({
  root: '.',
  plugins: [
   vue()
  ],
  resolve: {
    alias
  },
  test: {
    environment: 'jsdom'
  },
})
