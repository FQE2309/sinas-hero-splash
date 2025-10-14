# Instrucciones para Agregar Videos y Thumbnails

## Paso 1: Preparar los Videos

### Nombres de archivos esperados:
```
📁 /public/downloads/videos/
├── ingreso-sistema.mp4
├── navegacion-sistema.mp4
├── cargue-alcaldias.mp4
├── inventario-rural.mp4
└── gestion-iniciativas.mp4
```

### Formato recomendado:
- **Formato:** MP4 (H.264/AVC + AAC)
- **Resolución:** 1280x720 (HD) o superior
- **Bitrate:** 2-5 Mbps
- **Audio:** AAC, 128kbps

## Paso 2: Crear Thumbnails (Opcional pero recomendado)

### Nombres de thumbnails:
```
📁 /public/downloads/videos/thumbnails/
├── ingreso-sistema.jpg
├── navegacion-sistema.jpg
├── cargue-alcaldias.jpg
├── inventario-rural.jpg
└── gestion-iniciativas.jpg
```

### Especificaciones de thumbnails:
- **Formato:** JPG o PNG
- **Resolución:** 1280x720 pixels (16:9 aspect ratio)
- **Tamaño:** < 200KB por imagen
- **Calidad:** 80-90%

## Paso 3: Herramientas para Crear Thumbnails

### Desde video con FFmpeg:
```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 -q:v 2 thumbnail.jpg
```

### Desde YouTube (si descargas de allí):
- youtube-dl incluye opción de thumbnail automático
- También puedes tomar screenshot manualmente en el minuto más representativo

## Paso 4: Conversion de Video (si es necesario)

### FFmpeg command para optimizar:
```bash
ffmpeg -i input_video.mov -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k output.mp4
```

## Paso 5: Verificar Funcionamiento

1. Coloca los videos en `/public/downloads/videos/`
2. Coloca los thumbnails en `/public/downloads/videos/thumbnails/`
3. Ve a http://localhost:5173/tutoriales
4. Verifica que:
   - Los thumbnails se muestren correctamente
   - Los videos se reproduzcan al hacer clic
   - La descarga funcione con el botón de download

## Notas Importantes:

- Si no tienes thumbnails, se mostrará un fondo gris con el ícono de play
- Los videos se cargan solo cuando el usuario hace clic (lazy loading)
- El reproductor es responsive y funcionará en móviles
- Los controles son nativos del navegador (play, pause, volumen, fullscreen)

## Troubleshooting:

### Si los videos no cargan:
1. Verifica que los nombres coincidan exactamente
2. Asegúrate de que los videos estén en formato MP4
3. Verifica que no haya espacios o caracteres especiales en los nombres

### Si los thumbnails no aparecen:
1. Los thumbnails son opcionales
2. Verifica la ruta y nombres de archivo
3. Asegúrate de que sean imágenes válidas (JPG/PNG)