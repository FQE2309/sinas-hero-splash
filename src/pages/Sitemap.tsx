import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Link } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Network, 
  Users, 
  BarChart3, 
  HelpCircle, 
  ExternalLink,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Sitemap = () => {
  // Scroll automático al inicio
  useScrollToTop();
  
  // SEO para la página de Sitemap
  useSEO({
    title: 'Mapa del Sitio | SINAS - Navegación y Estructura del Portal',
    description: 'Mapa completo del sitio web SINAS. Encuentra fácilmente todas las secciones, páginas y recursos del Sistema de Inversiones en Agua Potable y Saneamiento Básico.',
    keywords: 'mapa del sitio, navegación, SINAS, estructura web, índice de páginas',
    url: 'https://sinas.minvivienda.gov.co/sitemap',
    type: 'article'
  });

  const siteStructure = [
    {
      title: "Página Principal",
      icon: Home,
      link: "/",
      description: "Inicio del portal SINAS con información general y estadísticas",
      sections: [
        { name: "Hero / Inicio", anchor: "#hero" },
        { name: "Estadísticas", anchor: "#estadisticas" },
        { name: "Reportes Públicos", anchor: "#reportes" },
        { name: "Mapa Interactivo", anchor: "#mapa" },
        { name: "Acerca del SINAS", anchor: "#acerca" },
        { name: "Ayuda y Soporte", anchor: "#ayuda" },
        { name: "Preguntas Frecuentes", anchor: "#faq" },
        { name: "Glosario", anchor: "#glosario" }
      ]
    },
    {
      title: "Normatividad",
      icon: FileText,
      link: "/normatividad",
      description: "Marco legal y normativo del sector de agua potable y saneamiento",
      sections: [
        { name: "Decretos y Resoluciones" },
        { name: "Guías Técnicas" },
        { name: "Documentos Oficiales" },
        { name: "Visor de PDFs" }
      ]
    },
    {
      title: "Interoperabilidad",
      icon: Network,
      link: "/interoperabilidad",
      description: "Entidades que interactúan con el sistema SINAS",
      sections: [
        { name: "Entidades Oferentes" },
        { name: "Entidades Demandantes" },
        { name: "Servicios Web" },
        { name: "APIs y Conexiones" }
      ]
    },
    {
      title: "Gestores Comunitarios",
      icon: Users,
      link: "/gestores-comunitarios",
      description: "Registro y gestión de organizaciones comunitarias",
      sections: [
        { name: "Formulario de Registro" },
        { name: "Documentación Requerida" },
        { name: "Requisitos Técnicos" },
        { name: "Beneficios del Registro" }
      ]
    }
  ];

  const externalLinks = [
    {
      title: "Sistema SINAS",
      url: "https://sinas.minvivienda.gov.co/SINAS/inicio/Login.aspx",
      description: "Acceso al sistema principal de inversiones"
    },
    {
      title: "Ministerio de Vivienda",
      url: "https://www.minvivienda.gov.co",
      description: "Portal oficial del Ministerio de Vivienda"
    },
    {
      title: "Portal del Estado",
      url: "https://www.gov.co",
      description: "Portal único del Estado Colombiano"
    }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background pt-32">
        <Navbar />
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary-light to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="flex justify-center mb-6">
                <MapPin className="w-16 h-16" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Mapa del Sitio
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Navegación completa del portal SINAS
              </p>
              <p className="text-lg opacity-80 max-w-3xl mx-auto">
                Encuentra fácilmente todas las secciones, páginas y recursos disponibles 
                en el Sistema de Inversiones en Agua Potable y Saneamiento Básico.
              </p>
            </div>
          </div>
        </section>

        {/* Site Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Estructura del Sitio</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {siteStructure.map((page, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <page.icon className="w-8 h-8 text-primary" />
                        <CardTitle className="text-xl">{page.title}</CardTitle>
                      </div>
                      <CardDescription>{page.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link 
                        to={page.link}
                        className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-light transition-colors mb-4"
                      >
                        Ir a {page.title}
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      
                      {page.sections && (
                        <div>
                          <h4 className="font-medium mb-2">Secciones incluidas:</h4>
                          <ul className="space-y-1">
                            {page.sections.map((section, sIndex) => (
                              <li key={sIndex} className="text-sm text-muted-foreground">
                                {section.anchor ? (
                                  <Link 
                                    to={`${page.link}${section.anchor}`}
                                    className="hover:text-primary transition-colors"
                                  >
                                    • {section.name}
                                  </Link>
                                ) : (
                                  <span>• {section.name}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Enlaces Externos</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {externalLinks.map((link, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {link.title}
                        <ExternalLink className="w-4 h-4" />
                      </CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-light font-medium transition-colors"
                      >
                        Visitar sitio →
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Navegación Rápida</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  to="/"
                  className="p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-center group"
                >
                  <Home className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Inicio</span>
                </Link>
                <Link 
                  to="/normatividad"
                  className="p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-center group"
                >
                  <FileText className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Normatividad</span>
                </Link>
                <Link 
                  to="/interoperabilidad"
                  className="p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-center group"
                >
                  <Network className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Interoperabilidad</span>
                </Link>
                <Link 
                  to="/gestores-comunitarios"
                  className="p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-center group"
                >
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Gestores</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Sitemap;