import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // todo: enable eslint in the final build
  plugins: [react(), /* eslint() */, svgr({
    include: "**/*.svg?react",
  }), tsconfigPaths()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/app/styles'),
    },
  },
  build: {
    sourcemap: true
  }
})
