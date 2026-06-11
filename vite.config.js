import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const githubPagesBase = '/personal-portfolio/'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : '/',
  plugins: [react()],
})
