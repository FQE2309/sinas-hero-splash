# 🐳 Docker - SINAS Landing Page

Esta guía te ayudará a dockerizar y ejecutar la Landing Page del SINAS usando Docker y Docker Compose.

## 📋 Prerequisitos

- Docker Desktop instalado y funcionando
- Git (para clonar el repositorio)
- PowerShell (en Windows) o terminal bash (en Linux/Mac)

## 🚀 Inicio Rápido

### Usando Docker Compose (Recomendado)

```bash
# 1. Iniciar la aplicación
docker-compose up -d

# 2. Ver logs
docker-compose logs -f

# 3. Detener la aplicación
docker-compose down
```

### Usando Docker directamente

```bash
# 1. Construir la imagen
docker build -t sinas-landing-page .

# 2. Ejecutar el contenedor
docker run -d -p 3000:80 --name sinas-landing sinas-landing-page

# 3. Ver en el navegador
# http://localhost:3000
```

### Usando Scripts de PowerShell (Windows)

```powershell
# Ver todos los comandos disponibles
.\docker-scripts.ps1 help

# Construir y ejecutar en un comando
.\docker-scripts.ps1 prod

# Ver estado del contenedor
.\docker-scripts.ps1 status
```

## 📁 Archivos Docker

### 🐳 Dockerfile
Imagen multi-stage optimizada:
- **Stage 1**: Build con Node.js (instala dependencias y compila)
- **Stage 2**: Producción con Nginx (sirve archivos estáticos)

### 🗃️ .dockerignore
Excluye archivos innecesarios para builds más rápidos:
- `node_modules`
- Archivos de desarrollo
- Logs y temporales

### 🐙 docker-compose.yml
Configuración completa con:
- Servicio principal de la landing page
- Servicios opcionales (DB, Redis, Proxy)
- Redes y volúmenes
- Health checks

### ⚙️ nginx.conf
Configuración optimizada:
- Soporte para SPA (Single Page Application)
- Headers de seguridad
- Compresión gzip
- Cache de assets estáticos

## 🛠️ Comandos Útiles

### Docker Compose

```bash
# Servicios básicos
docker-compose up -d                    # Iniciar en background
docker-compose down                     # Detener y eliminar
docker-compose restart                  # Reiniciar servicios
docker-compose logs -f                  # Ver logs en tiempo real

# Con servicios opcionales
docker-compose --profile database up -d # Con base de datos
docker-compose --profile cache up -d    # Con Redis
docker-compose --profile proxy up -d    # Con proxy reverso

# Gestión
docker-compose build                    # Reconstruir imágenes
docker-compose pull                     # Actualizar imágenes base
docker-compose ps                       # Ver estado de servicios
```

### Docker Directo

```bash
# Gestión de imagen
docker build -t sinas-landing-page .
docker images | grep sinas
docker rmi sinas-landing-page

# Gestión de contenedor
docker ps -a                          # Ver todos los contenedores
docker logs sinas-landing             # Ver logs
docker exec -it sinas-landing /bin/sh # Acceder al contenedor
docker restart sinas-landing          # Reiniciar
docker stop sinas-landing            # Detener
docker rm sinas-landing              # Eliminar contenedor
```

### Scripts PowerShell (Windows)

```powershell
# Comandos disponibles
.\docker-scripts.ps1 build          # Construir imagen
.\docker-scripts.ps1 run            # Ejecutar contenedor
.\docker-scripts.ps1 stop           # Detener contenedor
.\docker-scripts.ps1 restart        # Reiniciar contenedor
.\docker-scripts.ps1 logs           # Ver logs
.\docker-scripts.ps1 shell          # Acceder al shell
.\docker-scripts.ps1 clean          # Limpiar recursos
.\docker-scripts.ps1 status         # Ver estado
.\docker-scripts.ps1 compose-up     # Docker compose up
.\docker-scripts.ps1 compose-down   # Docker compose down
.\docker-scripts.ps1 dev            # Modo desarrollo
.\docker-scripts.ps1 prod           # Deploy producción
```

## 🌐 URLs de Acceso

Una vez iniciado, podrás acceder a:

- **Landing Page**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **Traefik Dashboard** (si está habilitado): http://localhost:8080

## 📊 Monitoreo

### Health Checks
El contenedor incluye health checks automáticos:
```bash
# Ver estado de salud
docker inspect sinas-landing | grep -A 10 Health

# Probar endpoint de salud manualmente
curl http://localhost:3000/health
```

### Logs
```bash
# Logs en tiempo real
docker-compose logs -f sinas-landing

# Logs con timestamp
docker logs -t sinas-landing

# Últimas 100 líneas
docker logs --tail 100 sinas-landing
```

### Uso de recursos
```bash
# Estadísticas en tiempo real
docker stats sinas-landing

# Una sola captura
docker stats --no-stream sinas-landing
```

## 🔧 Troubleshooting

### Problemas Comunes

**Puerto ocupado**
```bash
# Ver qué proceso usa el puerto 3000
netstat -tulpn | grep 3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:80"  # Cambiar 3000 por 3001
```

**Error de permisos**
```bash
# En Linux/Mac, asegurar permisos
sudo chown -R $(whoami): .
chmod +x docker-scripts.ps1
```

**Contenedor no inicia**
```bash
# Ver logs detallados
docker logs sinas-landing

# Verificar configuración
docker inspect sinas-landing
```

**Build fallido**
```bash
# Build sin cache
docker build --no-cache -t sinas-landing-page .

# Ver capas del build
docker build --progress=plain -t sinas-landing-page .
```

## 🚀 Deploy a Producción

### Preparar para producción
```bash
# 1. Build optimizado
npm run build

# 2. Construir imagen de producción
docker build -t sinas-landing-page:prod .

# 3. Tag para registry (opcional)
docker tag sinas-landing-page:prod registry.example.com/sinas-landing:v1.0.0

# 4. Push al registry (opcional)
docker push registry.example.com/sinas-landing:v1.0.0
```

### Variables de entorno
Crear `.env` para producción:
```env
NODE_ENV=production
PORT=80
DOMAIN=sinas.gov.co
```

## 📝 Notas Adicionales

- La imagen final pesa aproximadamente 25MB (nginx + archivos estáticos)
- El build tarda entre 2-5 minutos dependiendo de la máquina
- Los archivos estáticos se sirven con cache de 1 año
- La aplicación se reinicia automáticamente si el contenedor falla
- Los logs se rotan automáticamente para evitar llenar el disco

## 🤝 Soporte

Si tienes problemas:
1. Revisa los logs: `docker logs sinas-landing`
2. Verifica el health check: `curl http://localhost:3000/health`
3. Consulta esta documentación
4. Contacta al equipo de desarrollo