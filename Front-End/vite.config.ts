import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// O defineConfig ajuda o VS Code a te dar sugestões (auto-complete) 
// enquanto você digita, graças ao TypeScript!
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'], // Garante que o favicon seja incluído no cache
      manifest: {
        name: 'Caderno de Receitas da Dona Edite',
        short_name: 'ReceitasEdite',
        description: 'App de receitas da Dona Edite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})