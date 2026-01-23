// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import react from '@vitejs/plugin-react'; // atau plugin vue jika pakai vue
import { defineConfig } from 'vite'

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
        manualChunks: {
          // Pisahkan vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['recharts', 'react-markdown'],
          'vendor-firebase': ['firebase'],
          // Pisahkan pages menjadi chunk terpisah
          'pages-admin': [
            './src/Pages/admin/AdminDashboard.jsx',
            './src/Pages/admin/AdminProducts.jsx',
            './src/Pages/admin/AdminStats.jsx',
          ],
          'pages-user': [
            './src/Pages/Analisis.jsx',
            './src/Pages/HasilAnalisis.jsx',
            './src/Pages/Rekomendasi.jsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})