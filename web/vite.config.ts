import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';

let outDir = 'build';

if (process.env.NODE_ENV === 'staging') {
  outDir = 'staging';
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      features: path.resolve(__dirname, './src/features'),
      hooks: path.resolve(__dirname, './src/hooks'),
      pages: path.resolve(__dirname, './src/pages'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      constants: path.resolve(__dirname, './src/constants'),
    },
  },
  define: {
    DEVELOPMENT: process.env.NODE_ENV === 'development',
    PRODUCTION: process.env.NODE_ENV === 'production',
    STAGING: process.env.NODE_ENV === 'staging',
  },
  plugins: [react()],
  build: {
    outDir,
  },
});
