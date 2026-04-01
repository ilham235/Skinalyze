// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import react from '@vitejs/plugin-react'; // atau plugin vue jika pakai vue
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    // "true" artinya mengizinkan semua alamat (termasuk Serveo/Ngrok)
    allowedHosts: true,
  },
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Pisahkan vendor libraries
          if (id.includes('node_modules/react')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/firebase')) {
            return 'vendor-firebase';
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/react-markdown')) {
            return 'vendor-ui';
          }
          // Pisahkan admin pages
          if (id.includes('Pages/admin')) {
            return 'pages-admin';
          }
          // Pisahkan pages utama
          if (id.includes('Pages/Analisis') || id.includes('Pages/HasilAnalisis') || id.includes('Pages/Rekomendasi')) {
            return 'pages-user';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 600,
  },
})