import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Términos extraídos del glosario oficial de SINAS
const terminosGlosario = [
  {
    letra: "A",
    terminos: [
      {
        termino: "Acueducto",
        definicion: "Conjunto de obras, equipos y materiales utilizados para la captación, aducción, conducción, tratamiento y distribución del agua potable para consumo humano."
      },
      {
        termino: "Aducción",
        definicion: "Componente a través del cual se transporta agua cruda, ya sea a flujo libre o a presión."
      },
      {
        termino: "Agua potable",
        definicion: "Aquella que por reunir los requisitos organolépticos (olor, sabor y percepción visual), físicos, químicos y microbiológicos, puede ser consumida por la población humana sin producir efectos adversos a la salud."
      },
      {
        termino: "Aguas residuales",
        definicion: "Son todas las aguas que quedan después del uso de estas. Aguas de desecho provenientes de lavamanos, tinas de baño, duchas, lavaplatos, y otros artefactos que no descargan materias fecales."
      },
      {
        termino: "Aguas subterráneas",
        definicion: "Las subálveas y las ocultas debajo de la superficie del suelo o del fondo marino que brotan en forma natural, como las fuentes y manantiales captados en el sitio de afloramiento o las que requieren para su alumbramiento obras como pozos."
      },
      {
        termino: "APSB",
        definicion: "Agua Potable y Saneamiento Básico. Conjunto de servicios públicos que incluyen el suministro de agua potable, alcantarillado y aseo."
      }
    ]
  },
  {
    letra: "B",
    terminos: [
      {
        termino: "Bocatoma",
        definicion: "Estructura hidráulica que permite la captación del agua desde una fuente superficial hacia un sistema de acueducto."
      }
    ]
  },
  {
    letra: "C",
    terminos: [
      {
        termino: "Captación",
        definicion: "Conjunto de estructuras necesarias para tomar el agua de la fuente de abastecimiento."
      },
      {
        termino: "Conducción",
        definicion: "Componente a través del cual se transporta el agua potable desde la planta de tratamiento hasta los tanques de almacenamiento y/o redes de distribución."
      },
      {
        termino: "Cobertura",
        definicion: "Relación entre el número de personas que cuentan con el servicio y el número total de habitantes del área de estudio."
      }
    ]
  },
  {
    letra: "D",
    terminos: [
      {
        termino: "Distribución",
        definicion: "Componente del sistema de acueducto que comprende el conjunto de tuberías, accesorios y estructuras que conducen el agua desde los tanques de almacenamiento hasta las acometidas domiciliarias."
      },
      {
        termino: "Dotación",
        definicion: "Cantidad de agua asignada a una población o a un habitante para satisfacer sus necesidades, en un período determinado."
      }
    ]
  },
  {
    letra: "E",
    terminos: [
      {
        termino: "ESP",
        definicion: "Empresa de Servicios Públicos. Entidad encargada de la prestación de servicios públicos domiciliarios."
      },
      {
        termino: "Estación de bombeo",
        definicion: "Conjunto de estructuras civiles, equipos de bombeo, equipos eléctricos, tuberías y accesorios que permiten elevar las aguas de un nivel inferior a otro superior."
      }
    ]
  },
  {
    letra: "G",
    terminos: [
      {
        termino: "Gestor",
        definicion: "En el contexto del SINAS, entidad o persona responsable de la gestión y reporte de información relacionada con proyectos de agua potable y saneamiento básico."
      }
    ]
  }
];

const GlosarioSection = () => {
  const [filtro, setFiltro] = useState("");
  const [letraSeleccionada, setLetraSeleccionada] = useState("A");
  
  const termanosFiltrados = terminosGlosario.map(grupo => ({
    ...grupo,
    terminos: grupo.terminos.filter(termino => 
      termino.termino.toLowerCase().includes(filtro.toLowerCase()) ||
      termino.definicion.toLowerCase().includes(filtro.toLowerCase())
    )
  })).filter(grupo => grupo.terminos.length > 0);

  const letrasDisponibles = terminosGlosario.map(grupo => grupo.letra);

  return (
    <section id="glosario" className="py-16 lg:py-24 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Diccionario de Términos SINAS
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Consulte la recopilación de los principales términos, siglas y acrónimos utilizados en el 
            Sistema de Inversiones en Agua Potable y Saneamiento Básico.
          </p>
          
          {/* Barra de búsqueda */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar términos..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </div>
        </div>

        {/* Navegación alfabética */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {letrasDisponibles.map(letra => (
            <Button
              key={letra}
              variant={letraSeleccionada === letra ? "default" : "outline"}
              size="sm"
              onClick={() => setLetraSeleccionada(letra)}
              className="w-10 h-10"
            >
              {letra}
            </Button>
          ))}
        </div>

        {/* Términos del glosario */}
        <div className="space-y-8">
          {(filtro ? termanosFiltrados : terminosGlosario.filter(grupo => grupo.letra === letraSeleccionada)).map((grupo) => (
            <div key={grupo.letra}>
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Letra {grupo.letra}
              </h3>
              
              <div className="grid gap-4">
                {grupo.terminos.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-primary">
                        {item.termino}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed text-foreground">
                        {item.definicion}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enlace al glosario completo */}
        <div className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
            <p className="text-muted-foreground mb-4">
              ¿Necesita consultar más términos o definiciones completas?
            </p>
            <Button asChild size="lg">
              <a 
                href="https://sinas.minvivienda.gov.co/modulo-de-ayuda-sinas/glosario" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Ver glosario completo oficial
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlosarioSection;