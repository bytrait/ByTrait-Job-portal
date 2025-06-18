import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures assets load from root
  build: {
    outDir: 'dist', // Default, but ensure you're serving this
    emptyOutDir: true,
  },
})
