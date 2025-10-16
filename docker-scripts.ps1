# Script de automatización Docker para SINAS Landing Page
# Uso: .\docker-scripts.ps1 [comando]

param(
    [string]$Command = "help"
)

# Configuración
$IMAGE_NAME = "sinas-landing-page"
$CONTAINER_NAME = "sinas-landing"
$PORT = "3000"
$VERSION = "latest"

# Colores para output
$RED = "`e[31m"
$GREEN = "`e[32m"
$YELLOW = "`e[33m"
$BLUE = "`e[34m"
$RESET = "`e[0m"

function Write-ColorOutput {
    param([string]$Message, [string]$Color = $RESET)
    Write-Host "$Color$Message$RESET"
}

function Show-Help {
    Write-ColorOutput "=== SINAS Landing Page - Docker Management ===" $BLUE
    Write-Host ""
    Write-Host "Comandos disponibles:"
    Write-Host "  build       - Construir la imagen Docker"
    Write-Host "  run         - Ejecutar el contenedor"
    Write-Host "  stop        - Detener el contenedor"
    Write-Host "  restart     - Reiniciar el contenedor"
    Write-Host "  logs        - Ver logs del contenedor"
    Write-Host "  shell       - Acceder al shell del contenedor"
    Write-Host "  clean       - Limpiar contenedores e imágenes"
    Write-Host "  status      - Ver estado del contenedor"
    Write-Host "  compose-up  - Iniciar con docker-compose"
    Write-Host "  compose-down - Detener docker-compose"
    Write-Host "  dev         - Modo desarrollo (con watch)"
    Write-Host "  prod        - Deploy a producción"
    Write-Host "  help        - Mostrar esta ayuda"
}

function Build-Image {
    Write-ColorOutput "🔨 Construyendo imagen Docker..." $YELLOW
    try {
        docker build -t ${IMAGE_NAME}:${VERSION} .
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Imagen construida exitosamente" $GREEN
        } else {
            Write-ColorOutput "❌ Error al construir la imagen" $RED
            exit 1
        }
    } catch {
        Write-ColorOutput "❌ Error: $_" $RED
        exit 1
    }
}

function Run-Container {
    Write-ColorOutput "🚀 Iniciando contenedor..." $YELLOW
    
    # Verificar si el contenedor ya existe
    $existing = docker ps -a -q -f name=$CONTAINER_NAME
    if ($existing) {
        Write-ColorOutput "⚠️  Contenedor existente encontrado, eliminando..." $YELLOW
        docker rm -f $existing
    }
    
    try {
        docker run -d `
            --name $CONTAINER_NAME `
            -p "${PORT}:80" `
            --restart unless-stopped `
            ${IMAGE_NAME}:${VERSION}
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Contenedor iniciado en puerto $PORT" $GREEN
            Write-ColorOutput "🌐 Accede a: http://localhost:$PORT" $BLUE
        } else {
            Write-ColorOutput "❌ Error al iniciar contenedor" $RED
        }
    } catch {
        Write-ColorOutput "❌ Error: $_" $RED
    }
}

function Stop-Container {
    Write-ColorOutput "🛑 Deteniendo contenedor..." $YELLOW
    docker stop $CONTAINER_NAME 2>$null
    docker rm $CONTAINER_NAME 2>$null
    Write-ColorOutput "✅ Contenedor detenido" $GREEN
}

function Restart-Container {
    Write-ColorOutput "🔄 Reiniciando contenedor..." $YELLOW
    Stop-Container
    Start-Sleep -Seconds 2
    Run-Container
}

function Show-Logs {
    Write-ColorOutput "📋 Logs del contenedor:" $BLUE
    docker logs -f $CONTAINER_NAME
}

function Access-Shell {
    Write-ColorOutput "🐚 Accediendo al shell del contenedor..." $BLUE
    docker exec -it $CONTAINER_NAME /bin/sh
}

function Clean-Docker {
    Write-ColorOutput "🧹 Limpiando recursos Docker..." $YELLOW
    
    # Detener contenedor si existe
    docker stop $CONTAINER_NAME 2>$null
    docker rm $CONTAINER_NAME 2>$null
    
    # Eliminar imagen
    docker rmi ${IMAGE_NAME}:${VERSION} 2>$null
    
    # Limpiar imágenes dangling
    docker image prune -f
    
    Write-ColorOutput "✅ Limpieza completada" $GREEN
}

function Show-Status {
    Write-ColorOutput "📊 Estado del contenedor:" $BLUE
    docker ps -a --filter name=$CONTAINER_NAME --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    Write-ColorOutput "`n💾 Uso de recursos:" $BLUE
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" $CONTAINER_NAME 2>$null
}

function Compose-Up {
    Write-ColorOutput "🐳 Iniciando con docker-compose..." $YELLOW
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Servicios iniciados correctamente" $GREEN
    }
}

function Compose-Down {
    Write-ColorOutput "🐳 Deteniendo docker-compose..." $YELLOW
    docker-compose down
    Write-ColorOutput "✅ Servicios detenidos" $GREEN
}

function Dev-Mode {
    Write-ColorOutput "🔧 Modo desarrollo..." $YELLOW
    # Compilar en modo development primero
    npm run build:dev
    Build-Image
    Run-Container
    Write-ColorOutput "✅ Modo desarrollo activo" $GREEN
}

function Prod-Deploy {
    Write-ColorOutput "🚀 Deploy a producción..." $YELLOW
    
    # Build para producción
    npm run build
    Build-Image
    
    # Tag para producción
    docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:prod
    
    Run-Container
    Write-ColorOutput "✅ Deploy completado" $GREEN
}

# Switch principal de comandos
switch ($Command.ToLower()) {
    "build" { Build-Image }
    "run" { Run-Container }
    "stop" { Stop-Container }
    "restart" { Restart-Container }
    "logs" { Show-Logs }
    "shell" { Access-Shell }
    "clean" { Clean-Docker }
    "status" { Show-Status }
    "compose-up" { Compose-Up }
    "compose-down" { Compose-Down }
    "dev" { Dev-Mode }
    "prod" { Prod-Deploy }
    "help" { Show-Help }
    default { 
        Write-ColorOutput "❌ Comando no reconocido: $Command" $RED
        Show-Help
    }
}