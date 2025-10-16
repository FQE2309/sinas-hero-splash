# Multi-stage build para optimizar el tamaño final de la imagen
# Etapa 1: Build de la aplicación
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias de sistema necesarias
RUN apk add --no-cache libc6-compat

# Copiar archivos de configuración de dependencias primero (para aprovechar cache)
COPY package*.json ./
COPY bun.lockb* ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm ci --legacy-peer-deps

# Copiar archivos de configuración
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./
COPY eslint.config.js ./

# Copiar archivos de variables de entorno
COPY .env* ./

# Copiar el código fuente
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servidor nginx para servir la aplicación
FROM nginx:alpine AS production

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Crear usuario no-root para mayor seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Cambiar ownership de los archivos
RUN chown -R nextjs:nodejs /usr/share/nginx/html
RUN chown -R nextjs:nodejs /var/cache/nginx

# Exponer el puerto 80
EXPOSE 80

# Configuración de salud del contenedor
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Etiquetas de metadata
LABEL maintainer="SINAS Development Team"
LABEL version="1.0.0"
LABEL description="Landing Page SINAS - React + Vite"

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]