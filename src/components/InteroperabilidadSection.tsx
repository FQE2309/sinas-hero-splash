import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InteroperabilidadSection = () => {
  const entidadesOferentes = [
    {
      id: "sui",
      logo: "/images/interoperabilidad/sui-logo.jpg",
      logoAlt: "SUI",
      nombre: "Sistema Único de Información de Servicios Públicos Domiciliarios",
      descripcion: "Es el Sistema Único de Información oficial del sector de servicios públicos domiciliarios del país que recoge, almacena, procesa y publica información reportada por parte de las empresas prestadoras y entidades territoriales. El sistema está a cargo de la Superintendencia de Servicios Públicos Domiciliarios.",
      informacionSuministrada: "prestadores de servicios púbicos de acueducto, alcantarillado y aseo y de infraestructura de estos servicios a nivel urbano"
    },
    {
      id: "gesproy",
      logo: "/images/interoperabilidad/sgr_logo.jpg",
      logoAlt: "SGR",
      nombre: "GESPROY-SGR",
      descripcion: "El Sistema de Gestión y Monitoreo a la Ejecución de Proyectos es el aplicativo o plataforma tecnológica dispuesta para el reporte y seguimiento de información de los proyectos ejecutados con recursos del Sistema General Regalías. El ente ejecutor se encarga de reportar la información correspondiente a programación, contratación y ejecución de las actividades de los proyectos. El sistema está a cargo del Departamento Nacional de Planeación - DNP.",
      informacionSuministrada: "proyectos de inversión ejecutados con recursos de regalías para los temas de agua potable y saneamiento básico"
    },
    {
      id: "sisben",
      logo: "/images/interoperabilidad/sisben_logo.jpg",
      logoAlt: "Sisbén",
      nombre: "SISBEN IV",
      descripcion: "El Sisbén es el Sistema de Identificación de Potenciales Beneficiarios de Programas Sociales, que permite clasificar a la población de acuerdo con sus condiciones de vida e ingresos. Esta clasificación se utiliza para focalizar la inversión social y garantizar que sea asignada a quienes más lo necesitan. El sistema está a cargo del Departamento Nacional de Planeación - DNP.",
      informacionSuministrada: "condiciones de agua y saneamiento básico en la zona rural del país"
    },
    {
      id: "ciclope",
      logo: "/images/interoperabilidad/ciclope_logo.jpg",
      logoAlt: "CICLOPE",
      nombre: "CICLOPE",
      descripcion: "Herramienta de consulta que permite visualizar información detallada de los compromisos de programas y proyectos con recursos de Cooperación Internacional No Reembolsable en Colombia a través de distintos filtros, clasificados según su alcance geográfico: ámbito nacional o departamental y municipal. El sistema está a cargo de la Agencia Presidencia de Cooperación Internacional - APC Colombia.",
      informacionSuministrada: "proyectos de inversión ejecutados con recursos de cooperación internacional"
    },
    {
      id: "sirh",
      logo: "/images/interoperabilidad/ideam_logo.jpg",
      logoAlt: "IDEAM",
      nombre: "SIRH",
      descripcion: "El Sistema de Información del Recurso Hídrico - SIRH es el conjunto de elementos que integra y estandariza el acopio, registro, manejo y consulta de datos, bases de datos, estadísticas, sistemas, modelos, información documental y bibliográfica, reglamentos y protocolos que facilitan la gestión integral del recurso hídrico. El sistema está a cargo del Instituto de Hidrología, Meteorología y Estudios Ambientales - IDEAM.",
      informacionSuministrada: "oferta y demanda del recurso hídrico del país"
    },
    {
      id: "sigevas",
      logo: "/images/interoperabilidad/sigevas-logo.jpg",
      logoAlt: "SIGEVAS",
      nombre: "SIGEVAS",
      descripcion: "Sistema de Información para la Gestión de Agua y Saneamiento Básico. Ministerio de Vivienda - VASB.",
      informacionSuministrada: "proyectos de inversión de agua y saneamiento básico que se encuentren en ejecución, terminados y en evaluación"
    }
  ];

  const entidadesDemandantes = [
    {
      id: "art",
      logo: "/images/interoperabilidad/art-logo.jpg",
      logoAlt: "ART",
      nombre: "ART",
      descripcion: "La Agencia de Renovación del Territorio es una entidad estatal de naturaleza especial que tiene como objetivo coordinar la intervención de entidades nacionales y territoriales en zonas rurales afectadas por el conflicto priorizadas por el Gobierno nacional.",
      informacionSuministrada: "inventario de comunidades y sistema de agua y saneamiento básico rural, iniciativas proyectos de inversión, indicadores sectoriales y proyectos de inversión de agua y saneamiento básico de los municipios POET"
    }
  ];

  return (
    <section id="interoperabilidad" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Interoperabilidad
          </h2>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-primary mb-6">
            Entidades oferentes
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {entidadesOferentes.map((entidad, index) => (
            <Card key={entidad.id} className="shadow-2xl hover:shadow-2xl transition-shadow overflow-hidden border-0">
              {/* Logo en la parte superior */}
              <div className="bg-white p-6 border-b border-gray-100">
                <div className="flex justify-center items-center h-24">
                  <img 
                    src={entidad.logo} 
                    alt={entidad.logoAlt}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      // Fallback a texto si la imagen no carga
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-primary font-bold text-2xl">${entidad.logoAlt}</span>`;
                      }
                    }}
                  />
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-primary text-center mb-4">
                  {entidad.nombre}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-gray-700 text-sm leading-relaxed mb-4">
                  {entidad.descripcion}
                </CardDescription>
                
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-primary mb-2">
                    Información suministrada:
                  </h4>
                  <p className="text-sm text-gray-600">
                    {entidad.informacionSuministrada}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Entidades Demandantes */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-primary mb-6">
            Entidades demandantes
          </h3>
          
          <div className="grid gap-6">
            {entidadesDemandantes.map((entidad, index) => (
              <Card key={entidad.id} className="shadow-2xl hover:shadow-2xl transition-shadow overflow-hidden border-0">
                {/* Logo en la parte superior */}
                <div className="bg-white p-6 border-b border-gray-100">
                  <div className="flex justify-center items-center h-24">
                    <img 
                      src={entidad.logo} 
                      alt={entidad.logoAlt}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        // Fallback a texto si la imagen no carga
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-primary font-bold text-2xl">${entidad.logoAlt}</span>`;
                        }
                      }}
                    />
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-primary text-center mb-4">
                    {entidad.nombre}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-700 text-sm leading-relaxed mb-4">
                    {entidad.descripcion}
                  </CardDescription>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Información suministrada:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {entidad.informacionSuministrada}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteroperabilidadSection;