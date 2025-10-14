import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Presentation, Download, ArrowLeft, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const guias = [
  {
    title: "Inventario rural",
    filename: "Inventario_rural.pdf",
    size: "202.8 KB",
    description: "Guía para el manejo del inventario rural en el SINAS"
  },
  {
    title: "Gestores PDA",
    filename: "gestores_PDA.pdf", 
    size: "251.47 KB",
    description: "Manual para gestores de Planes Departamentales de Agua"
  },
  {
    title: "Metas APSB",
    filename: "Metas_APSB.pdf",
    size: "213.34 KB",
    description: "Guía para el seguimiento de metas de Agua Potable y Saneamiento Básico"
  },
  {
    title: "Gestión de proyectos y programas",
    filename: "Iniciativas.pdf",
    size: "250.29 KB",
    description: "Manual para la gestión de proyectos y programas en el SINAS"
  }
];

const manuales = [
  {
    title: "Guía cargue alcaldías",
    filename: "guia-cargue-alcaldias.pdf",
    size: "3.77 MB",
    description: "Manual detallado para el cargue de información por parte de las alcaldías"
  }
];

const presentaciones = [
  {
    title: "Ingreso al sistema",
    filename: "ingreso-al-sistema.pdf",
    size: "896.91 KB",
    description: "Presentación sobre cómo ingresar al sistema SINAS"
  },
  {
    title: "Estructura de navegación en el sistema",
    filename: "estructura-de-navegacion-en-el-sistema.pdf",
    size: "1.24 MB",
    description: "Guía de navegación por la interfaz del SINAS"
  },
  {
    title: "Gestión de iniciativas proyectos de inversión",
    filename: "gestion-de-iniciativas-proyectos-de-inversion.pdf",
    size: "2.42 MB",
    description: "Presentación sobre gestión de iniciativas y proyectos"
  },
  {
    title: "Socialización SINAS",
    filename: "socializacion-sinas.pdf",
    size: "1.64 MB",
    description: "Presentación general del sistema SINAS"
  },
  {
    title: "Presentación Inventario Rural",
    filename: "presentacion-inventario-rural_0.pdf",
    size: "3.06 MB",
    description: "Presentación detallada sobre el inventario rural"
  },
  {
    title: "Presentación cargue alcaldías",
    filename: "presentacion-cargue-alcaldias_1.pdf",
    size: "2.82 MB",
    description: "Presentación sobre el proceso de cargue para alcaldías"
  },
  {
    title: "Presentación cargue PDA",
    filename: "presentacion-cargue-pda.pdf",
    size: "1.78 MB",
    description: "Presentación sobre el cargue de Planes Departamentales de Agua"
  }
];

interface PDFViewerProps {
  title: string;
  filename: string;
  description: string;
}

const PDFViewer = ({ title, filename, description }: PDFViewerProps) => {
  const pdfUrl = `/downloads/pdfs/${filename}`;
  
  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ height: '70vh' }}>
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title={`Visor de ${title}`}
        >
          <p>Tu navegador no soporta la visualización de PDFs. 
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Haz clic aquí para descargar el PDF
            </a>
          </p>
        </iframe>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={pdfUrl} download>
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </a>
        </Button>
      </div>
    </div>
  );
};

interface DocumentCardProps {
  title: string;
  filename: string;
  size: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const DocumentCard = ({ title, filename, size, description, icon: Icon, color }: DocumentCardProps) => {
  const downloadUrl = `/downloads/pdfs/${filename}`;
  
  return (
    <Card className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 h-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className={`bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <CardTitle className="text-lg text-primary leading-tight">
                {title}
              </CardTitle>
              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                {size}
              </Badge>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 group-hover:bg-primary/90 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                Ver documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] w-[95vw]">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <PDFViewer 
                title={title}
                filename={filename}
                description={description}
              />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" asChild>
            <a href={downloadUrl} download>
              <Download className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const GuiasYManuales = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <a href="/#ayuda">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Ayuda
              </a>
            </Button>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Guías y Manuales SINAS
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Descarga toda la documentación oficial del Sistema de Inversiones de Agua Potable y Saneamiento Básico
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Guías */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Book className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Guías</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {guias.map((guia, index) => (
              <DocumentCard
                key={index}
                title={guia.title}
                filename={guia.filename}
                size={guia.size}
                description={guia.description}
                icon={Book}
                color="text-blue-600"
              />
            ))}
          </div>
        </section>

        {/* Manuales */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold text-foreground">Manuales</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {manuales.map((manual, index) => (
              <DocumentCard
                key={index}
                title={manual.title}
                filename={manual.filename}
                size={manual.size}
                description={manual.description}
                icon={FileText}
                color="text-green-600"
              />
            ))}
          </div>
        </section>

        {/* Presentaciones */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Presentation className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-foreground">Presentaciones</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentaciones.map((presentacion, index) => (
              <DocumentCard
                key={index}
                title={presentacion.title}
                filename={presentacion.filename}
                size={presentacion.size}
                description={presentacion.description}
                icon={Presentation}
                color="text-orange-600"
              />
            ))}
          </div>
        </section>

        {/* Información adicional */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Necesitas ayuda adicional?
            </h3>
            <p className="text-muted-foreground mb-6">
              Si tienes dudas sobre alguno de estos documentos, contáctanos
            </p>
            <Button asChild>
              <a href="mailto:apoyo.sinas@minvivienda.gov.co">
                Escribir a apoyo.sinas@minvivienda.gov.co
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiasYManuales;