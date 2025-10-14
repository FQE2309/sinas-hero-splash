import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, FileText, Network, Users, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const NotFound = () => {
  const location = useLocation();
  
  // Scroll automático al inicio
  useScrollToTop();
  
  // SEO para página 404
  useSEO({
    title: 'Página No Encontrada | SINAS',
    description: 'La página que buscas no existe. Explora nuestras secciones principales del Sistema de Inversiones en Agua Potable y Saneamiento Básico.',
    keywords: '404, página no encontrada, SINAS, error',
    url: `https://sinas.minvivienda.gov.co${location.pathname}`,
    type: 'article'
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    {
      title: "Página Principal",
      description: "Volver al inicio del portal SINAS",
      icon: Home,
      link: "/",
      color: "text-primary"
    },
    {
      title: "Normatividad",
      description: "Marco legal y documentos oficiales",
      icon: FileText,
      link: "/normatividad",
      color: "text-blue-600"
    },
    {
      title: "Interoperabilidad",
      description: "Entidades y servicios conectados",
      icon: Network,
      link: "/interoperabilidad",
      color: "text-green-600"
    },
    {
      title: "Gestores Comunitarios",
      description: "Registro de organizaciones",
      icon: Users,
      link: "/gestores-comunitarios",
      color: "text-purple-600"
    }
  ];

  const helpfulTips = [
    "Verifica que la URL esté escrita correctamente",
    "El enlace puede estar desactualizado o haber cambiado",
    "Intenta navegar desde la página principal",
    "Usa el mapa del sitio para encontrar lo que buscas"
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Error Code */}
              <div className="relative mb-8">
                <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <HelpCircle className="w-24 h-24 text-primary" />
                </div>
              </div>
              
              {/* Error Message */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                ¡Oops! Página no encontrada
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                La página que buscas no existe o ha sido movida. Te ayudamos a encontrar lo que necesitas.
              </p>
              
              {/* Current Path */}
              <div className="inline-block bg-muted/50 px-4 py-2 rounded-lg mb-8">
                <span className="text-sm text-muted-foreground">Ruta solicitada: </span>
                <code className="text-sm font-mono text-destructive">{location.pathname}</code>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/">
                    <ArrowLeft className="w-5 h-5" />
                    Volver al Inicio
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/sitemap">
                    <Search className="w-5 h-5" />
                    Mapa del Sitio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Páginas Populares</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((item, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} />
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-4">{item.description}</CardDescription>
                      <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto font-normal">
                        <Link to={item.link} className="text-primary hover:text-primary-dark">
                          Ir a {item.title} →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Helpful Tips */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Consejos Útiles</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {helpfulTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-4">
                  ¿Sigues teniendo problemas? Contáctanos para obtener ayuda.
                </p>
                <Button asChild variant="outline">
                  <Link to="/#ayuda">
                    Obtener Ayuda
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default NotFound;
