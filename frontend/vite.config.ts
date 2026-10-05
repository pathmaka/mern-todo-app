import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy /api to the Express server so the browser makes same-origin requests.
// Port 5000 is the backend default; change it here if PORT differs in backend/.env.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:5000' } },
})
