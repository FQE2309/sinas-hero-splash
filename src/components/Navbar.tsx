import { Button } from "@/components/ui/button";
import { Droplet, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-light/20">
      {/* Gov.co Banner */}
      <div className="bg-primary-dark">
        <div className="container mx-auto px-4 py-2">
          <a
            href="https://www.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground text-sm hover:underline inline-flex items-center gap-2"
          >
            <span className="font-semibold">GOV.CO</span>
            <span className="hidden sm:inline">- Portal del Estado Colombiano</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 rounded-full p-2">
              <Droplet className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-primary-foreground">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight">SINAS</h1>
              <p className="text-xs sm:text-sm opacity-90 hidden sm:block">
                Sistema de Inversiones en Agua Potable y Saneamiento Básico
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#acerca" className="text-primary-foreground hover:text-primary-light transition-colors">
              Acerca del SINAS
            </a>
            <a href="#normatividad" className="text-primary-foreground hover:text-primary-light transition-colors">
              Normatividad
            </a>
            <a href="#interoperabilidad" className="text-primary-foreground hover:text-primary-light transition-colors">
              Interoperabilidad
            </a>
            <a href="#reportes" className="text-primary-foreground hover:text-primary-light transition-colors">
              Reportes
            </a>
            <a href="#ayuda" className="text-primary-foreground hover:text-primary-light transition-colors">
              Ayuda
            </a>
            <Button variant="hero-outline" size="sm" className="ml-4">
              Ingresar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-primary-light/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#acerca" className="text-primary-foreground hover:text-primary-light transition-colors">
                Acerca del SINAS
              </a>
              <a href="#normatividad" className="text-primary-foreground hover:text-primary-light transition-colors">
                Normatividad
              </a>
              <a href="#interoperabilidad" className="text-primary-foreground hover:text-primary-light transition-colors">
                Interoperabilidad
              </a>
              <a href="#reportes" className="text-primary-foreground hover:text-primary-light transition-colors">
                Reportes
              </a>
              <a href="#ayuda" className="text-primary-foreground hover:text-primary-light transition-colors">
                Ayuda
              </a>
              <Button variant="hero-outline" size="sm" className="w-full">
                Ingresar
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
