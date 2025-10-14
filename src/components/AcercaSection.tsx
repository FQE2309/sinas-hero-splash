import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, CheckCircle2, Users, Database, TrendingUp } from "lucide-react";

const objetivos = [
  {
    icon: Target,
    title: "Planear y definir proyectos",
    description: "Sistematizar y priorizar proyectos de inversión en infraestructura del sector"
  },
  {
    icon: TrendingUp,
    title: "Monitorear proyectos",
    description: "Seguimiento y control de los proyectos de inversión en infraestructura"
  },
  {
    icon: Database,
    title: "Consultar indicadores",
    description: "Facilitar consultas de indicadores sectoriales y estadísticas del sector"
  },
  {
    icon: CheckCircle2,
    title: "Proyectos ejecutados",
    description: "Consultar proyectos de inversión ejecutados y en proceso de ejecución"
  },
  {
    icon: Users,
    title: "Necesidades municipales",
    description: "Identificar necesidades de inversión de municipios y distritos del país"
  },
  {
    icon: Eye,
    title: "Condiciones rurales",
    description: "Evaluar condiciones de acceso a agua y saneamiento básico en zona rural"
  }
];

const AcercaSection = () => {
  return (
    <section id="acerca" className="py-16 lg:py-24 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Acerca del SINAS
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            El Sistema de Inversiones en Agua Potable y Saneamiento Básico tiene como objeto planear, definir, 
            sistematizar, priorizar y monitorear los proyectos de inversión en infraestructura del sector.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Target className="w-5 h-5" />
                Misión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Facilitar la gestión transparente y eficiente de inversiones en agua potable y saneamiento básico en Colombia, 
                proporcionando herramientas modernas para la planeación y monitoreo de proyectos del sector hídrico.
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="text-secondary flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser la herramienta principal para la planeación, definición, sistematización, priorización y monitoreo 
                de proyectos del sector hídrico, promoviendo la transparencia y el desarrollo sostenible del país.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Objectives */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Objetivos del Sistema
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objetivos.map((objetivo, index) => {
              const Icon = objetivo.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50"
                >
                  <CardHeader className="pb-3">
                    <div className="bg-primary/10 p-3 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{objetivo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {objetivo.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Description */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              ¿Qué hace el SINAS?
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Asimismo, el sistema permite hacer consultas de indicadores sectoriales, proyectos de inversión en 
              infraestructura ejecutados y en proceso de ejecución, necesidades de inversión de los municipios y 
              distritos del país y las condiciones de acceso a agua y saneamiento básico de su zona rural.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Información Centralizada</h4>
                <p className="text-sm text-muted-foreground">
                  Base de datos unificada de proyectos e inversiones del sector
                </p>
              </div>
              
              <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-secondary/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Gestión Colaborativa</h4>
                <p className="text-sm text-muted-foreground">
                  Participación de alcaldías y gestores a nivel nacional
                </p>
              </div>
              
              <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Monitoreo Continuo</h4>
                <p className="text-sm text-muted-foreground">
                  Seguimiento en tiempo real del progreso de proyectos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcercaSection;