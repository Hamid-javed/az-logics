import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows connections from other devices on the network
    port: 5174,       // Ensure this is the correct port
  },
  build: {
    rollupOptions: {
      output: {
        preserveExports: true,
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-query', 'axios'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

