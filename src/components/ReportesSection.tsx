import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Target, Database } from "lucide-react";

const reportes = [
  {
    icon: Database,
    title: "Reportes públicos SINAS",
    description:
      "El SINAS cuenta con un conjunto de reportes públicos que permiten a la ciudadanía consultar la información reportada por las alcaldías y Gestores a nivel Nacional",
  },
  {
    icon: FileText,
    title: "Iniciativas de proyectos de inversión",
    description:
      "Consulte la información reportada por parte de las alcaldías a nivel nacional sobre su planeación de proyectos en agua potable y saneamiento básico",
    link: "#",
  },
  {
    icon: TrendingUp,
    title: "Metas ejecutadas APSB",
    description:
      "Consulte la información reportada por parte de las alcaldías a nivel nacional sobre las metas ejecutadas en materia de compromisos y usos, indicadores, fuentes de financiación y ejecución",
    link: "#",
  },
  {
    icon: Target,
    title: "Metas Proyectadas APSB",
    description:
      "Consulte la información de metas proyectadas reportadas por las alcaldías en agua potable y saneamiento básico",
    link: "#",
  },
];

const ReportesSection = () => {
  return (
    <section id="reportes" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {reportes.map((reporte, index) => {
            const Icon = reporte.icon;
            return (
              <Card
                key={index}
                className={`group hover:shadow-glow transition-all duration-300 border-2 ${
                  index === 0 ? "md:col-span-1 border-primary" : "border-border hover:border-primary-light"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary mb-2">{reporte.title}</CardTitle>
                      <CardDescription className="text-base">{reporte.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {reporte.link && (
                  <CardContent>
                    <a
                      href={reporte.link}
                      className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 group/link"
                    >
                      consulte el reporte aquí
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReportesSection;
