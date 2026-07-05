import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/enterprise-task-manager/',
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/app/styles'),
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
  },
});
