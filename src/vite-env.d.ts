/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_PASSWORD_HASH: string
  // Agrega más variables de entorno aquí si es necesario
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
