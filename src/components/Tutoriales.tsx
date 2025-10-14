import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Play, ArrowLeft, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const tutoriales = [
  {
    id: "cargue-iniciativas-metas",
    title: "Cargue de iniciativas, metas proyectadas y ejecutadas",
    filename: "cargue-iniciativas-metas.mp4",
    duration: "15:45",
    description: "Tutorial completo sobre cómo cargar iniciativas, definir metas proyectadas y registrar metas ejecutadas en el SINAS.",
    thumbnail: "/images/downloads/videos/thumbnails/cargue-iniciativas-metas.jpg"
  }
];

interface VideoPlayerProps {
  title: string;
  filename: string;
  description: string;
}

const VideoPlayer = ({ title, filename, description }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoUrl = `/downloads/videos/${filename}`;
  
  return (
    <div className="w-full">
      <div className="bg-black rounded-lg overflow-hidden mb-4">
        <video
          controls
          preload="metadata"
          className="w-full h-auto max-h-[70vh]"
          onLoadedMetadata={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          <p>Tu navegador no soporta el elemento video.</p>
        </video>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white">Cargando video...</div>
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

interface VideoCardProps {
  tutorial: typeof tutoriales[0];
}

const VideoCard = ({ tutorial }: VideoCardProps) => {
  const thumbnailUrl = tutorial.thumbnail || "/images/placeholder.svg";
  
  return (
    <Card className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={thumbnailUrl}
            alt={`Thumbnail de ${tutorial.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback a una imagen por defecto o color de fondo
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-12 h-12 text-white" />
          </div>
          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
            <Clock className="w-3 h-3 mr-1" />
            {tutorial.duration}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-lg text-primary mb-2 group-hover:text-primary/80 transition-colors">
          {tutorial.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed mb-4">
          {tutorial.description}
        </CardDescription>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 group-hover:bg-primary/90 transition-colors">
                <Play className="w-4 h-4 mr-2" />
                Ver tutorial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>{tutorial.title}</DialogTitle>
                <DialogDescription>{tutorial.description}</DialogDescription>
              </DialogHeader>
              <VideoPlayer 
                title={tutorial.title}
                filename={tutorial.filename}
                description={tutorial.description}
              />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" asChild>
            <a href={`/downloads/videos/${tutorial.filename}`} download>
              <Download className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Tutoriales = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
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
            Tutoriales SINAS
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Aprende a usar el Sistema de Inversiones de Agua Potable y Saneamiento Básico con nuestros videos tutoriales
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Tutoriales */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Video className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-foreground">Videos Tutoriales</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutoriales.map((tutorial) => (
              <VideoCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </section>

        {/* Información adicional */}
        <div className="bg-gradient-to-br from-green-50 via-background to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <Video className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Necesitas un tutorial específico?
            </h3>
            <p className="text-muted-foreground mb-6">
              Si no encuentras el tutorial que necesitas, contáctanos y lo crearemos para ti
            </p>
            <Button asChild>
              <a href="mailto:apoyo.sinas@minvivienda.gov.co">
                Solicitar tutorial personalizado
              </a>
            </Button>
          </div>
        </div>

        {/* Información técnica */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">Información técnica:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Los videos están optimizados para reproducción web</li>
            <li>• Puedes descargar cualquier video para verlo sin conexión</li>
            <li>• Recomendamos usar auriculares para una mejor experiencia</li>
            <li>• Los videos se cargan progresivamente para ahorrar datos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tutoriales;