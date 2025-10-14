import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Video, HelpCircle, BookOpen, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const recursosAyuda = [
  {
    icon: Book,
    title: "Guías y manuales",
    description: "Consulte información relacionada con los módulos, formularios y pasos para los cargues al SINAS.",
    url: "/guias-manuales",
    color: "text-blue-600"
  },
  {
    icon: Video,
    title: "Tutoriales",
    description: "Consulte los videos explicativos del paso a paso para el reporte, consulta y modificación de información en SINAS.",
    url: "/tutoriales",
    color: "text-green-600"
  },
  {
    icon: HelpCircle,
    title: "Preguntas frecuentes",
    description: "Consulte la lista de preguntas frecuentes acerca del aplicativo SINAS.",
    url: "#faq",
    color: "text-orange-600"
  },
  {
    icon: BookOpen,
    title: "Glosario",
    description: "Consulte la recopilación de los principales términos, siglas y acrónimos utilizados en el SINAS.",
    url: "#glosario",
    color: "text-purple-600"
  }
];

const AyudaSection = () => {
  return (
    <section id="ayuda" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Módulo de ayuda SINAS
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acá encontrará un conjunto de recursos que le servirán de soporte y ayuda ante cualquier duda 
            que se presente en su interacción con el SINAS
          </p>
        </div>

        {/* Recursos de ayuda */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {recursosAyuda.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 h-full"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Icon className={`w-6 h-6 ${recurso.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary mb-2">
                        {recurso.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {recurso.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    asChild={recurso.url !== "#"}
                  >
                    {recurso.url !== "#" ? (
                      <a href={recurso.url}>
                        <span className="mr-2">Ver recursos</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    ) : (
                      <>
                        <span className="mr-2">Ver recursos</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sección de Solicitudes de apoyo */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Solicitudes de apoyo
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Podrá encontrar un formulario, videos de capacitaciones y el correo donde podrá dejar sus solicitudes al SINAS.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Buzón de ayuda */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary justify-center">
                  <Mail className="w-5 h-5" />
                  Buzón de ayuda SINAS
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Si ninguna de las herramientas de ayuda resolvió su duda, puede contactarnos directamente.
                </p>
                <Button className="w-full" asChild>
                  <a href="mailto:apoyo.sinas@minvivienda.gov.co">
                    <Mail className="w-4 h-4 mr-2" />
                    apoyo.sinas@minvivienda.gov.co
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Información adicional */}
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Horario de Atención:</strong> Lunes a viernes de 8:00 am - 5:30 pm<br/>
                <strong>Correo general:</strong> correspondencia@minvivienda.gov.co<br/>
                <strong>Teléfono Conmutador:</strong> +57 (1) 3715363
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AyudaSection;