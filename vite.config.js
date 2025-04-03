// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/manners-webapp/', // ✅ GitHub Pages용 base 경로 설정
  plugins: [react()]
});
