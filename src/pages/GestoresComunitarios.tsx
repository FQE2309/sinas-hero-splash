import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { useLinks } from "@/contexts/LinksContext";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Users, FileText, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GestoresComunitarios = () => {
  const { links } = useLinks();
  
  // Scroll automático al inicio
  useScrollToTop();

  // SEO para la página de Gestores Comunitarios
  useSEO({
    title: 'Gestores Comunitarios | SINAS - Registro y Gestión de Organizaciones',
    description: 'Registra y gestiona organizaciones comunitarias en el sistema SINAS. Formulario oficial para gestores comunitarios del sector de agua potable y saneamiento básico en Colombia.',
    keywords: 'gestores comunitarios, organizaciones comunitarias, registro, formulario, SINAS, agua potable, saneamiento, comunidades',
    url: 'https://sinas.minvivienda.gov.co/gestores-comunitarios',
    type: 'article'
  });

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary via-primary-light to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Layout con icono a la izquierda y contenido a la derecha en desktop */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Icono y botón (izquierda en desktop) */}
              <div className="flex flex-col items-center lg:items-start space-y-6 lg:w-2/5">
                <div className="w-24 h-24 bg-primary-foreground/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-12 h-12 text-primary-foreground" />
                </div>
                
                {/* Botón Principal */}
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  asChild
                >
                  <a 
                    href={links.gestoresComunitarios} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3"
                  >
                    📄 Abrir Formulario
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </Button>
                
                {/* Indicadores de seguridad */}
                <div className="flex flex-col sm:flex-row gap-3 text-sm opacity-90 text-primary-foreground">
                  <div className="flex items-center gap-2">
                    🔒 <span>Conexión segura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    📱 <span>Optimizado para móvil</span>
                  </div>
                </div>
              </div>
              
              {/* Contenido principal (derecha en desktop) */}
              <div className="text-primary-foreground text-center lg:text-left lg:w-3/5">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Gestores Comunitarios
                </h1>
                <p className="text-lg md:text-xl mb-4 opacity-95">
                  Registro y gestión de organizaciones comunitarias del sector hídrico
                </p>
                <p className="text-base md:text-lg opacity-85 leading-relaxed">
                  Plataforma oficial para el registro, actualización y seguimiento de gestores 
                  comunitarios que operan sistemas de acueducto y alcantarillado en Colombia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información y Requisitos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <FileText className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Documentación Requerida</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Personería jurídica vigente</li>
                    <li>• RUT actualizado</li>
                    <li>• Certificación bancaria</li>
                    <li>• Representante legal identificado</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Requisitos Técnicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Licencia ambiental (si aplica)</li>
                    <li>• Planos técnicos del sistema</li>
                    <li>• Certificado de calidad del agua</li>
                    <li>• Registro de usuarios</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CheckCircle className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Beneficios del Registro</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Acceso a programas de apoyo</li>
                    <li>• Asesoría técnica especializada</li>
                    <li>• Financiación de proyectos</li>
                    <li>• Capacitación continua</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Alerts informativos */}
            <div className="space-y-4 mb-8">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Información Importante</AlertTitle>
                <AlertDescription>
                  El registro en el sistema SINAS es obligatorio para todas las organizaciones 
                  comunitarias que prestan servicios de acueducto y alcantarillado en Colombia, 
                  según lo establecido en el Decreto 1898 de 2016.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Ayuda y Recursos */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Recursos de Ayuda</h2>
            <p className="text-lg text-muted-foreground mb-8">
              ¿Necesita ayuda con el proceso de registro? Consulte nuestros recursos disponibles.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Guías y Manuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Documentos detallados sobre el proceso de registro
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a href="/guias-manuales">Ver Guías</a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Tutoriales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Videos paso a paso del proceso de registro
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a href="/tutoriales">Ver Tutoriales</a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Soporte Técnico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Asistencia personalizada para resolver dudas
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a href="mailto:soporte.sinas@minvivienda.gov.co">Contactar</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                ℹ️ <strong>Importante:</strong> El registro en SINAS es obligatorio según el Decreto 1898 de 2016. 
                Para mayor información sobre el proceso, consulte nuestros recursos o contacte soporte técnico.
              </p>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default GestoresComunitarios;