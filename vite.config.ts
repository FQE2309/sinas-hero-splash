import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libs grandes
          'vendor-react': ['react', 'react-dom'],
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ],
          'vendor-utils': [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
            'date-fns',
            'zod'
          ],
          'vendor-charts': ['recharts'],
          'vendor-forms': [
            'react-hook-form',
            '@hookform/resolvers',
            'input-otp'
          ],
          'vendor-animation': [
            'react-intersection-observer',
            'react-countup'
          ],
          'vendor-routing': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-carousel': ['embla-carousel-react'],
          'vendor-misc': [
            'lucide-react',
            'next-themes',
            'sonner',
            'vaul',
            'cmdk',
            'react-day-picker',
            'react-resizable-panels'
          ]
        }
      }
    },
    // Configuración de optimización
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Aumentar el límite para chunks grandes pero mantener el warning
    chunkSizeWarningLimit: 1000,
    // Configuración de assets
    assetsInlineLimit: 4096 // Inline assets menores a 4KB
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ],
    exclude: ['@radix-ui/react-navigation-menu']
  },
}));
