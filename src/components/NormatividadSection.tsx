import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileText, Calendar, Eye } from "lucide-react";
import { useState } from "react";

interface PDFViewerProps {
  title: string;
  filename: string;
  description: string;
}

const PDFViewer = ({ title, filename, description }: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const pdfUrl = `/downloads/documentos/${filename}`;
  
  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-[70vh]">
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          title={`Visor PDF: ${title}`}
        >
          <p>Tu navegador no soporta la visualización de PDFs. 
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Haz clic aquí para descargar el PDF</a>
          </p>
        </iframe>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-600">Cargando documento...</div>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface DocumentCardProps {
  norma: typeof normatividad[0];
}

const DocumentCard = ({ norma }: DocumentCardProps) => {
  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'resolución':
        return 'default';
      case 'circular':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Extraer solo el nombre del archivo
  const filename = norma.archivo.split('/').pop() || '';
  
  return (
    <Card className="shadow-2xl hover:shadow-2xl transition-shadow border-0 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={getTipoBadgeVariant(norma.tipo)} className="text-sm">
                {norma.tipo}
              </Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {norma.fecha}
              </div>
            </div>
            <CardTitle className="text-lg text-primary mb-2 group-hover:text-primary/80 transition-colors">
              {norma.numero}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-gray-700 text-sm leading-relaxed mb-6">
          {norma.titulo}
        </CardDescription>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 group-hover:bg-primary/90 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                Ver documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] w-[90vw]">
              <DialogHeader>
                <DialogTitle>{norma.numero}</DialogTitle>
                <DialogDescription>{norma.titulo}</DialogDescription>
              </DialogHeader>
              <PDFViewer 
                title={norma.numero}
                filename={filename}
                description={norma.titulo}
              />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" asChild>
            <a 
              href={norma.archivo} 
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NormatividadSection = () => {
  const normatividad = [
    {
      id: "res-487-2017",
      tipo: "Resolución",
      numero: "Resolución 0487 de 2017",
      titulo: "Por la cual se reglamenta el funcionamiento, operación y administración del Sistema de Inversiones de Agua Potable y Saneamiento Básico – SINAS.",
      fecha: "26 de Julio de 2017",
      archivo: "/downloads/documentos/resolucion-0487-2017.pdf"
    },
    {
      id: "res-246-2018",
      tipo: "Resolución",
      numero: "Resolución 0246 de 2018",
      titulo: "Por la cual se modifica el Artículo 4 de la Resolución 0487 de 2017, que amplía el plazo a los entes territoriales y gestores departamentales para el reporte de iniciativas de inversión de proyectos al SINAS.",
      fecha: "10 de Abril de 2018",
      archivo: "/downloads/documentos/resolucion-0246-2018.pdf"
    },
    {
      id: "res-288-2020",
      tipo: "Resolución",
      numero: "Resolución 0288 de 2020",
      titulo: "Por la cual se modifican los artículos 1 y 3 y se subroga el anexo de la Resolución 1067 del 24 de diciembre de 2015, en lo relacionado con los lineamientos para la formulación de metas de cobertura, calidad, continuidad y aseguramiento en el acceso a agua potable y saneamiento básico.",
      fecha: "03 de Junio de 2020",
      archivo: "/downloads/documentos/resolucion-0288-2020.pdf"
    },
    {
      id: "res-dnp-1468-2020",
      tipo: "Resolución",
      numero: "Resolución DNP 1468 de 2020",
      titulo: "Por medio de la cual se establecen los lineamientos, plazos y medios de reporte de la información por parte de los Gestores de los Planes Departamentales para el Manejo Empresarial de los Servicios de Agua y Saneamiento (PDA), para la medición de la capacidad institucional y de resultados.",
      fecha: "01 de Julio de 2020",
      archivo: "/downloads/documentos/resolucion-dnp-1468-2020.pdf"
    },
    {
      id: "circular-cargue-alcaldias",
      tipo: "Circular",
      numero: "Circular Cargue Alcaldías",
      titulo: "Reporte de información al Sistema de Inversiones en Agua Potable y Saneamiento Básico (SINAS) de las necesidades de proyectos de inversión, indicadores y metas de cobertura, calidad, continuidad y aseguramiento en el acceso a agua potable y saneamiento básico, de conformidad con la Resolución MVCT 0288 de 2020.",
      fecha: "30 de Marzo de 2021",
      archivo: "/downloads/documentos/circular-cargue-alcaldias-2021.pdf"
    },
    {
      id: "circular-ampliacion-2021",
      tipo: "Circular",
      numero: "Circular ampliación cargue alcaldías 2021EE0057332 de 2021",
      titulo: "Ampliación de plazo para el reporte de información al Sistema de Inversiones en Agua Potable y Saneamiento Básico (SINAS) de las necesidades de proyectos de inversión, compromisos y usos, fuentes de financiación, línea base y metas de los indicadores de cobertura, calidad, continuidad y aseguramiento en el acceso a agua potable y saneamiento básico, de conformidad con la resolución MVCT 0288 de 2020.",
      fecha: "27 de Mayo de 2021",
      archivo: "/downloads/documentos/circular-ampliacion-2021.pdf"
    },
    {
      id: "res-1010-2021",
      tipo: "Resolución",
      numero: "Resolución 1010 de 2021",
      titulo: "Por la cual se definen los indicadores específicos y estratégicos para el monitoreo al uso y ejecución de los recursos del Sistema General de Participaciones para Agua Potable y Saneamiento Básico por parte de los municipios, distritos y departamentos, y se establecen los lineamientos para la formulación de metas de cobertura, calidad, continuidad y aseguramiento en el acceso a Agua Potable y Saneamiento Básico que deberán definirse en los planes de desarrollo de las entidades territoriales.",
      fecha: "30 de Diciembre de 2021",
      archivo: "/downloads/documentos/resolucion-1010-2021.pdf"
    }
  ];

  return (
    <section id="normatividad" className="pt-8 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Normatividad
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-700 text-base leading-relaxed">
              Para efectos de garantizar un planificado desarrollo territorial en materia de infraestructura de agua potable y saneamiento básico, el artículo 57 de la ley 1537 de 2012 creó dentro de la estructura operativa del Ministerio de Vivienda, Ciudad y Territorio el Sistema de Inversiones en Agua Potable y Saneamiento Básico – SINAS.
            </p>
            <p className="text-gray-700 text-base leading-relaxed mt-4">
              A continuación encontrará los lineamientos normativos relacionados con la creación y operación del SINAS.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {normatividad.map((norma) => (
            <DocumentCard key={norma.id} norma={norma} />
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 mr-3" />
            <h3 className="text-2xl font-bold">
              Marco Normativo Completo
            </h3>
          </div>
          <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
            Toda la normatividad aquí presentada está orientada a garantizar el correcto funcionamiento 
            y operación del SINAS, así como el cumplimiento de los objetivos en materia de agua potable 
            y saneamiento básico en Colombia.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50"
            asChild
          >
            <a href="mailto:apoyo.sinas@minvivienda.gov.co">
              <FileText className="w-4 h-4 mr-2" />
              Consultar normatividad adicional
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NormatividadSection;