import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deploying under a sub-path (e.g. GitHub Pages)? Build with:
//   npm run build -- --base=/your-repo-name/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
  },
});
