import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), alias()],
  server: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: {
      'components': resolve(projectRootDir, "src/components")
    }
  }
})
