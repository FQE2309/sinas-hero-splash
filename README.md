# SINAS Landing Page 🌊

## 📋 Descripción

Landing Page oficial del **Sistema de Inversiones en Agua Potable y Saneamiento Básico (SINAS)** del Ministerio de Vivienda, Ciudad y Territorio de Colombia. Esta aplicación web sirve como punto de entrada principal para usuarios que desean acceder al sistema SINAS, consultar reportes públicos, documentación y recursos relacionados con la gestión del agua potable y saneamiento básico en Colombia.

## 🚀 Tecnologías Principales

- **Frontend Framework:** React 18.3.1 con TypeScript
- **Build Tool:** Vite 5.4.19
- **Styling:** TailwindCSS + shadcn/ui
- **State Management:** React Context API
- **Routing:** React Router DOM 6.30.1
- **Animations:** Framer Motion 12.23.24
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Data Fetching:** TanStack Query

## 🏗️ Estructura del Proyecto

```
Landing Page/
├── public/                          # Archivos estáticos públicos
│   ├── downloads/                   # Documentos y recursos descargables
│   │   ├── documentos/              # Documentos oficiales (.doc, .pdf)
│   │   ├── pdfs/                    # Guías y manuales en PDF
│   │   └── videos/                  # Videos tutoriales
│   ├── images/                      # Imágenes y logos
│   │   ├── hero/                    # Imágenes del carrousel principal
│   │   ├── interoperabilidad/       # Logos de sistemas interoperables
│   │   └── sinas-logo.svg           # Logo oficial SINAS
│   └── sitemap.xml                  # Mapa del sitio para SEO
├── src/
│   ├── components/                  # Componentes reutilizables
│   │   ├── ui/                      # Componentes UI base (shadcn/ui)
│   │   │   ├── button.tsx           # Componente botón
│   │   │   ├── input.tsx            # Componente input
│   │   │   ├── card.tsx             # Componente tarjeta
│   │   │   ├── SearchBar.tsx        # Barra de búsqueda
│   │   │   ├── ThemeToggle.tsx      # Selector de tema
│   │   │   ├── LoadingSpinner.tsx   # Indicador de carga
│   │   │   ├── PageTransition.tsx   # Transiciones entre páginas
│   │   │   └── Breadcrumbs.tsx      # Navegación de migas de pan
│   │   ├── icons/                   # Iconos personalizados
│   │   │   └── XIcon.tsx            # Icono de X (Twitter)
│   │   ├── Navbar.tsx               # Barra de navegación principal
│   │   ├── Footer.tsx               # Pie de página
│   │   ├── HeroSection.tsx          # Sección hero con carousel
│   │   ├── StatsSection.tsx         # Sección de estadísticas
│   │   ├── ReportesSection.tsx      # Sección de reportes públicos
│   │   ├── AcercaSection.tsx        # Sección "Acerca del SINAS"
│   │   ├── InteroperabilidadSection.tsx # Sistemas interoperables
│   │   ├── NormatividadSection.tsx  # Normatividad
│   │   ├── AyudaSection.tsx         # Sección de ayuda
│   │   ├── FAQSection.tsx           # Preguntas frecuentes
│   │   ├── GlosarioSection.tsx      # Glosario de términos
│   │   ├── GuiasYManuales.tsx       # Página de guías y manuales
│   │   ├── Tutoriales.tsx           # Página de tutoriales
│   │   ├── MapSection.tsx           # Mapa interactivo
│   │   └── Logo.tsx                 # Componente del logo SINAS
│   ├── contexts/                    # Contextos de React
│   │   ├── LinksContext.tsx         # Gestión de enlaces del sitio
│   │   └── ThemeContext.tsx         # Gestión de temas (light/dark/system)
│   ├── hooks/                       # Custom hooks
│   │   ├── useSEO.ts                # Hook para SEO dinámico
│   │   ├── useScrollToTop.ts        # Hook para scroll al inicio
│   │   ├── use-mobile.tsx           # Detección de dispositivos móviles
│   │   └── use-toast.ts             # Sistema de notificaciones
│   ├── lib/                         # Utilidades
│   │   └── utils.ts                 # Funciones utilitarias (cn, etc.)
│   ├── pages/                       # Páginas principales
│   │   ├── Index.tsx                # Página de inicio
│   │   ├── NotFound.tsx             # Página 404
│   │   ├── AdminLinks.tsx           # 🔐 Panel de administración
│   │   ├── GestoresComunitarios.tsx # Información para gestores
│   │   ├── Interoperabilidad.tsx    # Página de interoperabilidad
│   │   ├── Normatividad.tsx         # Página de normatividad
│   │   ├── SearchResults.tsx        # Resultados de búsqueda
│   │   └── Sitemap.tsx              # Mapa del sitio
│   ├── App.tsx                      # Componente raíz de la aplicación
│   ├── main.tsx                     # Punto de entrada de la aplicación
│   ├── index.css                    # Estilos globales y variables CSS
│   └── vite-env.d.ts                # Definiciones de tipos para Vite
├── components.json                  # Configuración de shadcn/ui
├── eslint.config.js                 # Configuración de ESLint
├── package.json                     # Dependencias y scripts
├── tailwind.config.ts               # Configuración de TailwindCSS
├── tsconfig.json                    # Configuración de TypeScript
├── tsconfig.app.json                # Config TS específico para la app
├── tsconfig.node.json               # Config TS para Node.js
└── vite.config.ts                   # Configuración de Vite
```

## 🔐 Sistema de Autenticación

### Panel de Administración
La aplicación incluye un panel de administración protegido por contraseña para gestionar los enlaces del sitio.

**📍 Ubicación:** `/admin/links`  
**🔑 Contraseña:** `SINAS_Links_2025` (hasheada con SHA-256)  
**📂 Archivo:** `src/pages/AdminLinks.tsx`  
**🔐 Seguridad:** Hash SHA-256 + Variable de entorno

### Características del Panel Admin:
- ✅ **Autenticación Segura:** Contraseña hasheada con SHA-256 (no visible en código)
- ✅ **Variables de Entorno:** Hash almacenado en archivo `.env`
- ✅ **Gestión de Enlaces:** Permite modificar todos los enlaces del sitio
- ✅ **Persistencia:** Los cambios se guardan en localStorage del navegador
- ✅ **Categorías de Enlaces:**
  - Enlaces principales (Sistema SINAS, Gestores Comunitarios)
  - Redes sociales (Facebook, X/Twitter, LinkedIn, YouTube, Instagram)
  - Enlaces institucionales (MinVivienda, Gov.co)
  - Enlaces de ayuda (Soporte técnico, Manuales, Tutoriales)
  - Enlaces adicionales (Políticas, Términos, Contacto)

### Configuración de Seguridad:
1. **Archivo `.env`:** Contiene el hash SHA-256 de la contraseña
2. **Hash actual:** `ac84b41b88d9951c6c159694ce9a8e4a83e38cdf399e98e119533908755e72e5`
3. **Generación de nuevo hash:**
   ```bash
   node -e "console.log(require('crypto').createHash('sha256').update('TU_NUEVA_CONTRASEÑA').digest('hex'))"
   ```

### Acceso al Panel:
1. Navegar a: `https://tu-dominio.com/admin/links`
2. Ingresar la contraseña: `SINAS_Links_2025`
3. Gestionar enlaces desde la interfaz

### Cambiar Contraseña:
1. Generar nuevo hash con el comando de arriba
2. Actualizar `VITE_ADMIN_PASSWORD_HASH` en el archivo `.env`
3. Reiniciar la aplicación

## 🗺️ Mapa de Rutas de la Aplicación

### 🏠 Rutas Públicas
| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Index.tsx | **Página principal** - Landing page completa con todas las secciones |
| `/guias-manuales` | GuiasYManuales.tsx | **Guías y Manuales** - Documentación técnica y guías de usuario |
| `/tutoriales` | Tutoriales.tsx | **Tutoriales** - Videos tutoriales y recursos de aprendizaje |
| `/interoperabilidad` | Interoperabilidad.tsx | **Interoperabilidad** - Sistemas integrados y APIs |
| `/normatividad` | Normatividad.tsx | **Normatividad** - Marco legal y regulatorio |
| `/gestores-comunitarios` | GestoresComunitarios.tsx | **Gestores Comunitarios** - Información y registro para gestores |
| `/sitemap` | Sitemap.tsx | **Mapa del Sitio** - Índice de todas las páginas |
| `/search` | SearchResults.tsx | **Resultados de Búsqueda** - Página de resultados de búsqueda |
| `/*` | NotFound.tsx | **Error 404** - Página no encontrada |

### 🔐 Rutas Protegidas
| Ruta | Componente | Descripción | Autenticación |
|------|------------|-------------|---------------|
| `/admin/links` | AdminLinks.tsx | **Panel de Administración** - Gestión de enlaces | Contraseña requerida |

### 🎯 Navegación por Secciones (Página Principal)
La página principal (`/`) incluye navegación suave a estas secciones:
- `#hero` - Sección Hero con carousel
- `#stats` - Estadísticas del sistema
- `#reportes` - Reportes públicos
- `#acerca` - Acerca del SINAS
- `#normatividad` - Normatividad
- `#interoperabilidad` - Interoperabilidad
- `#ayuda` - Ayuda y soporte
- `#faq` - Preguntas frecuentes
- `#glosario` - Glosario de términos

## 🎨 Sistema de Temas

La aplicación soporta tres modos de tema:
- **🌞 Light Mode:** Tema claro
- **🌙 Dark Mode:** Tema oscuro  
- **🖥️ System Mode:** Se adapta al tema del sistema operativo

**Gestión:** `src/contexts/ThemeContext.tsx`  
**Persistencia:** localStorage con clave `sinas_theme_preference`

## 🔗 Gestión Dinámica de Enlaces

Los enlaces del sitio son gestionados dinámicamente a través del contexto `LinksContext`:

**📂 Archivo:** `src/contexts/LinksContext.tsx`  
**💾 Almacenamiento:** localStorage con clave `sinas_site_links`  
**🔄 Funcionalidades:**
- Actualización en tiempo real
- Valores por defecto configurables
- Reset a valores originales
- Validación de tipos con TypeScript

### Enlaces por Defecto:
```typescript
{
  // Enlaces principales
  ingresarSistema: 'https://sinas.minvivienda.gov.co/SINAS/inicio/Login.aspx',
  gestoresComunitarios: 'https://gestores.sinas.minvivienda.gov.co/registro',
  
  // Redes sociales
  facebook: 'https://www.facebook.com/MinVivienda',
  twitter: 'https://x.com/minvivienda',
  linkedin: 'https://www.linkedin.com/company/ministerio-de-vivienda-ciudad-y-territorio',
  youtube: 'https://www.youtube.com/user/MinVivienda',
  instagram: 'https://www.instagram.com/minvivienda/',
  
  // Enlaces institucionales
  minvivienda: 'https://www.minvivienda.gov.co',
  govco: 'https://www.gov.co',
  
  // Soporte y ayuda
  soporteTecnico: 'mailto:soporte.sinas@minvivienda.gov.co',
  manualesGuias: '/guias-manuales',
  tutoriales: '/tutoriales',
  
  // Enlaces adicionales
  politicaPrivacidad: 'https://www.minvivienda.gov.co/politica-de-privacidad',
  terminosUso: 'https://www.minvivienda.gov.co/terminos-de-uso',
  contacto: 'https://www.minvivienda.gov.co/contacto'
}
```

## 📱 Características de UX/UI

### 🎭 Animaciones y Transiciones
- **Framer Motion:** Transiciones suaves entre páginas
- **Animaciones escalonadas:** Elementos aparecen secuencialmente
- **Parallax scrolling:** Efecto parallax en imágenes de fondo
- **Hover effects:** Efectos interactivos en botones y tarjetas
- **Loading states:** Indicadores de carga personalizados

### 📐 Diseño Responsivo
- **Mobile-first approach:** Diseño optimizado para móviles
- **Breakpoints de TailwindCSS:** `sm`, `md`, `lg`, `xl`, `2xl`
- **Menú hamburguesa:** Navegación móvil colapsible
- **Imágenes responsivas:** Optimizadas para diferentes resoluciones

### ♿ Accesibilidad
- **ARIA labels:** Etiquetas semánticas para lectores de pantalla
- **Focus management:** Navegación por teclado optimizada
- **Color contrast:** Cumple estándares WCAG 2.1
- **Screen reader support:** Compatible con tecnologías asistivas

## 🔍 SEO y Optimización

### 📊 SEO Técnico
- **Meta tags dinámicos:** Hook `useSEO` para cada página
- **Sitemap XML:** `/public/sitemap.xml`
- **OpenGraph tags:** Optimizado para redes sociales
- **Structured data:** Marcado semántico HTML5

### ⚡ Optimización de Performance
- **Code splitting:** Lazy loading de componentes
- **Bundle optimization:** Chunks manuales en Vite
- **Asset optimization:** Compresión de imágenes y assets
- **Tree shaking:** Eliminación de código no utilizado

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en puerto 8080

# Construcción
npm run build        # Build de producción
npm run build:dev    # Build en modo desarrollo
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd "Landing Page"

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno
La aplicación no requiere variables de entorno específicas, pero utiliza:
- **Local Storage:** Para persistir temas y enlaces modificados
- **Session Storage:** Para mantener estado de autenticación admin

## 🔧 Configuración de Desarrollo

### Vite Configuration
```typescript
// vite.config.ts - Puerto personalizado y optimizaciones
server: {
  host: "::",
  port: 8080,
}
```

### TailwindCSS
- **Design System:** Tokens personalizados para colores SINAS
- **Dark mode:** Soporte completo con clase `dark`
- **Componentes:** Integración con shadcn/ui

### TypeScript
- **Strict mode:** Configuración estricta
- **Path mapping:** Alias `@/` para imports relativos
- **Type safety:** Tipado fuerte en toda la aplicación

## 📚 Recursos y Documentación

### 📖 Documentos Disponibles
- **Manuales técnicos:** `/public/downloads/pdfs/`
- **Circulares oficiales:** `/public/downloads/documentos/`
- **Videos tutoriales:** `/public/downloads/videos/`
- **Guías de usuario:** Accesible desde `/guias-manuales`

### 🎥 Contenido Multimedia
- **Videos instructivos:** Cargue de iniciativas, gestión PDA, inventario rural
- **Presentaciones:** Socialización SINAS, cargue de alcaldías
- **Imágenes:** Logos institucionales, fondos, iconografía

## 🤝 Contribución

### 🔄 Flujo de Trabajo
1. **Desarrollo local:** Usar `npm run dev`
2. **Testing:** Verificar funcionalidades en diferentes dispositivos
3. **Lint:** Ejecutar `npm run lint` antes de commit
4. **Build:** Verificar que `npm run build` funcione correctamente

### 📋 Guidelines
- **Componentes:** Crear componentes reutilizables en `/components/ui/`
- **Tipos:** Definir interfaces TypeScript para nuevas funcionalidades
- **Estilos:** Usar TailwindCSS y mantener consistencia con el design system
- **Accesibilidad:** Incluir ARIA labels y navegación por teclado

## 🐛 Solución de Problemas

### Problemas Comunes
1. **Puerto ocupado:** Cambiar puerto en `vite.config.ts`
2. **Dependencias:** Ejecutar `npm install` si faltan paquetes
3. **Cache:** Limpiar cache del navegador para cambios en localStorage
4. **Build errors:** Verificar tipos TypeScript y imports

### 🔍 Debug
- **React DevTools:** Para debug de componentes y estado
- **Network tab:** Verificar carga de recursos y APIs
- **Console:** Logs detallados para troubleshooting

## 📄 Licencia

Proyecto desarrollado para el **Ministerio de Vivienda, Ciudad y Territorio** de Colombia.  
Todos los derechos reservados © 2025 MinVivienda.

## 📞 Contacto y Soporte

- **Soporte Técnico:** soporte.sinas@minvivienda.gov.co
- **Ministerio de Vivienda:** https://www.minvivienda.gov.co
- **Portal Gov.co:** https://www.gov.co

---

**🌊 SINAS - Sistema de Inversiones en Agua Potable y Saneamiento Básico**  
*Gestionando el futuro hídrico de Colombia* 🇨🇴
