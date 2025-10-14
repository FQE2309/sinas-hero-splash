import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  const location = useLocation();

  // Si no se pasan items, generar automáticamente desde la URL
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Inicio',
        href: '/',
        icon: <Home className="w-4 h-4" />
      }
    ];

    // Mapeo de rutas a nombres legibles
    const routeNames: Record<string, string> = {
      'normatividad': 'Normatividad',
      'interoperabilidad': 'Interoperabilidad',
      'gestores-comunitarios': 'Gestores Comunitarios',
      'sitemap': 'Mapa del Sitio',
      'admin': 'Administración',
      'links': 'Enlaces',
      'guias-manuales': 'Guías y Manuales',
      'tutoriales': 'Tutoriales'
    };

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // No mostrar breadcrumbs en la página principal
  if (location.pathname === '/' && !items) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-200 dark:border-blue-700 shadow-md ${className}`}
      style={{ minHeight: '60px' }}
    >
      <div className="container mx-auto px-4 py-4">
        <ol className="flex items-center space-x-2 md:space-x-3 text-base font-medium">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <Fragment key={index}>
                <li className="flex items-center">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 transition-colors rounded px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-800/50 font-semibold"
                      aria-label={`Ir a ${item.label}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <span 
                      className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold px-3 py-2 bg-blue-100 dark:bg-blue-800/50 rounded"
                      aria-current="page"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                  )}
                </li>
                
                {!isLast && (
                  <li aria-hidden="true" className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-blue-500 dark:text-blue-400 font-bold" />
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;