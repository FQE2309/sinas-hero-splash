import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Instagram, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import XIcon from "@/components/icons/XIcon";
import { useLinks } from "@/contexts/LinksContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { links } = useLinks();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div>
            <div className="mb-4">
              <Logo size="sm" />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Sistema de Inversiones en Agua Potable y Saneamiento Básico del Ministerio de
              Vivienda, Ciudad y Territorio.
            </p>
            <div className="flex gap-3">
              <a
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="X (antes Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#acerca" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Acerca del SINAS
                </Link>
              </li>
              <li>
                <Link to="/normatividad" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Normatividad
                </Link>
              </li>
              <li>
                <Link to="/interoperabilidad" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Interoperabilidad
                </Link>
              </li>
              <li>
                <Link to="/gestores-comunitarios" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Gestores Comunitarios
                </Link>
              </li>
              <li>
                <Link to="/#reportes" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Reportes Públicos
                </Link>
              </li>
              <li>
                <Link to="/#ayuda" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Información Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={links.terminosUso} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href={links.politicaPrivacidad} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href={links.politicaPrivacidad} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Política de Tratamiento de Datos
                </a>
              </li>
              <li>
                <a href={links.contacto} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accesibilidad
                </a>
              </li>
              <li>
                <Link to="/sitemap" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Mapa del Sitio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Calle 17 No. 9 - 36 piso 3<br />
                  Bogotá, D. C., Colombia
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Horario de Atención:<br />
                  Lunes a viernes de 8:00 am - 5:30 pm
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={links.soporteTecnico} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {links.soporteTecnico.replace('mailto:', '')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <p>
            © {currentYear} Ministerio de Vivienda, Ciudad y Territorio - Todos los derechos reservados
          </p>
          <div className="flex gap-6 items-center">
            <a href={links.govco} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
              GOV.CO
            </a>
            <a href={links.minvivienda} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
              MinVivienda
            </a>
            {/* Logo administrativo discreto */}
            <Link 
              to="/admin/links" 
              className="opacity-40 hover:opacity-100 transition-opacity ml-4 text-primary-foreground/60 hover:text-primary-foreground"
              aria-label="Panel de administración"
              title="Panel de administración"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
