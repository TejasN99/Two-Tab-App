// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/two-tab-repo/',  // <—— This must match your GitHub repo name
  plugins: [react()],
})
