import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchBar from "@/components/ui/SearchBar";
import { useLinks } from "@/contexts/LinksContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { links } = useLinks();

  // Función para manejar navegación a secciones en la página principal
  const handleSectionNavigation = (sectionId: string) => {
    if (isHomePage) {
      // Si estamos en la página principal, hacer scroll a la sección
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si no estamos en la página principal, navegar a la home con transiciones suaves
      navigate('/');
      // Crear un observer para detectar cuando la página principal esté cargada
      const checkAndScroll = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Esperar un poco más para que el layout esté completamente renderizado
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return true;
        }
        return false;
      };
      
      // Intentar varias veces hasta encontrar el elemento
      let attempts = 0;
      const maxAttempts = 10;
      const interval = setInterval(() => {
        attempts++;
        if (checkAndScroll() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  // Función para manejar el click en el logo
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      // Si estamos en la página principal, hacer scroll al inicio (hero)
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Si no estamos en la página principal, dejamos que Link maneje la navegación
    // esto usará React Router y las transiciones suaves
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-light/20" role="banner">
      {/* Gov.co Banner */}
      <div className="bg-primary-dark">
        <div className="container mx-auto px-4 py-2">
          <a
            href="https://www.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground text-sm hover:underline inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-primary-dark rounded-sm"
            aria-label="Ir al Portal del Estado Colombiano GOV.CO"
          >
            <span className="font-semibold">GOV.CO</span>
            <span className="hidden sm:inline">- Portal del Estado Colombiano</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            aria-label={isHomePage ? "Ir al inicio de la página" : "Ir a la página principal"}
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6" role="menubar">
            <button 
              onClick={() => handleSectionNavigation('acerca')}
              className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
              role="menuitem"
              aria-label="Ir a la sección Acerca del SINAS"
            >
              Acerca del SINAS
            </button>
            <Link 
              to="/normatividad" 
              className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
              role="menuitem"
              aria-label="Ir a la página de Normatividad"
            >
              Normatividad
            </Link>
            <Link 
              to="/interoperabilidad" 
              className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
              role="menuitem"
              aria-label="Ir a la página de Interoperabilidad"
            >
              Interoperabilidad
            </Link>
            <Link 
              to="/gestores-comunitarios" 
              className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
              role="menuitem"
              aria-label="Ir a la página de Gestores Comunitarios"
            >
              Gestores Comunitarios
            </Link>
            <button 
              onClick={() => handleSectionNavigation('reportes')}
              className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
              role="menuitem"
              aria-label="Ir a la sección de Reportes"
            >
              Reportes
            </button>
            <button 
              onClick={() => handleSectionNavigation('ayuda')}
              className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
              role="menuitem"
              aria-label="Ir a la sección de Ayuda"
            >
              Ayuda
            </button>
            
            {/* Search */}
            <div className="ml-4">
              <SearchBar variant="navbar" />
            </div>
            
            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
            
            <Button variant="hero-outline" size="sm" className="ml-4" asChild>
              <a 
                href={links.ingresarSistema} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Ingresar al Sistema SINAS (abre en nueva ventana)"
              >
                Ingresar al Sistema
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-primary-foreground p-2 focus:outline-none focus:ring-2 focus:ring-primary-light rounded-md transition-colors hover:bg-primary-light/10"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden mt-4 py-4 border-t border-primary-light/20 animate-fade-in"
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleSectionNavigation('acerca')}
                className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1 text-left"
                role="menuitem"
                aria-label="Ir a la sección Acerca del SINAS"
              >
                Acerca del SINAS
              </button>
              <Link 
                to="/normatividad" 
                className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Ir a la página de Normatividad"
              >
                Normatividad
              </Link>
              <Link 
                to="/interoperabilidad" 
                className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Ir a la página de Interoperabilidad"
              >
                Interoperabilidad
              </Link>
              <Link 
                to="/gestores-comunitarios" 
                className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Ir a la página de Gestores Comunitarios"
              >
                Gestores Comunitarios
              </Link>
              <button 
                onClick={() => handleSectionNavigation('reportes')}
                className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1 text-left"
                role="menuitem"
                aria-label="Ir a la sección de Reportes"
              >
                Reportes
              </button>
              <button 
                onClick={() => handleSectionNavigation('ayuda')}
                className="text-primary-foreground hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm px-2 py-1 text-left"
                role="menuitem"
                aria-label="Ir a la sección de Ayuda"
              >
                Ayuda
              </button>
              
              {/* Search Mobile */}
              <div className="pt-4">
                <SearchBar variant="page" className="w-full" />
              </div>
              
              {/* Theme Toggle Mobile */}
              <div className="flex justify-center pt-2">
                <ThemeToggle />
              </div>
              
              <Button variant="hero-outline" size="sm" className="w-full" asChild>
                <a 
                  href={links.ingresarSistema} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="Ingresar al Sistema SINAS (abre en nueva ventana)"
                >
                  Ingresar al Sistema
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
