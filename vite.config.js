import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), alias()],
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  resolve: {
    alias: {
      'components': resolve(projectRootDir, "src/components"),
      'views': resolve(projectRootDir, "src/views")
    }
  }
})
