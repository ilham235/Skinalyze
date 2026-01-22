// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // atau plugin vue jika pakai vue

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // TAMBAHKAN BAGIAN INI:
  server: {
    // "true" artinya mengizinkan semua alamat (termasuk Serveo/Ngrok)
    allowedHosts: true,
  },
})