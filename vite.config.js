import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE_PATH for GitHub Pages subpath deployments, e.g. "/<repo>/"
// On Netlify/Vercel keep it as '/' (default).
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  plugins: [react()],
  base,
})

