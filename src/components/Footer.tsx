import { Droplet, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-foreground/10 rounded-full p-2">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">SINAS</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Sistema de Inversiones en Agua Potable y Saneamiento Básico del Ministerio de
              Vivienda, Ciudad y Territorio.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#acerca" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Acerca del SINAS
                </a>
              </li>
              <li>
                <a href="#normatividad" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Normatividad
                </a>
              </li>
              <li>
                <a href="#interoperabilidad" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Interoperabilidad
                </a>
              </li>
              <li>
                <a href="#reportes" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Reportes Públicos
                </a>
              </li>
              <li>
                <a href="#ayuda" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Información Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Política de Tratamiento de Datos
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accesibilidad
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Mapa del Sitio
                </a>
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
                  Calle 17 # 9 - 36<br />
                  Bogotá D.C., Colombia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+576013323434" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  +57 601 332 3434
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:sinas@minvivienda.gov.co" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  sinas@minvivienda.gov.co
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
          <div className="flex gap-6">
            <a href="https://www.gov.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
              GOV.CO
            </a>
            <a href="https://www.minvivienda.gov.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
              MinVivienda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
