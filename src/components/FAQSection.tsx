import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, Mail, ExternalLink, Download, FileText } from "lucide-react";
import { useState } from "react";

// Preguntas frecuentes extraídas del sitio oficial SINAS
const preguntasFrecuentes = [
  {
    categoria: "Acceso y Usuario",
    preguntas: [
      {
        pregunta: "Obtener acceso a SINAS, Cambio de representante Legal",
        respuesta: "Para solicitar acceso al sistema SINAS o cambio de representante legal, debe enviar la documentación requerida al correo apoyo.sinas@minvivienda.gov.co:\n\n1) Nombre completo del funcionario/contratista encargado del cargue de información\n\n2) Formato de compromiso de confidencialidad y no divulgación GTI-F-14 firmado\n\n3) Acta de designación del alcalde o documento de vinculación a la entidad territorial (funcionarios)\n\n4) Copia de contrato de prestación de servicios y acta de inicio (contratistas)\n\n5) La solicitud debe enviarse desde un correo institucional"
      },
      {
        pregunta: "¿Dónde puedo descargar el formato de compromiso de confidencialidad GTI-F-14?",
        respuesta: "Puede descargar el formato de compromiso de confidencialidad y no divulgación de información GTI-F-14 (Versión 7) haciendo clic en el botón de descarga. Este formato debe ser diligenciado completamente, firmado y adjuntado en su solicitud de acceso al SINAS.",
        documento: "/downloads/documentos/GTI-F-14_V7.doc"
      }
    ]
  },
  {
    categoria: "Cargue de Información",
    preguntas: [
      {
        pregunta: "¿Cómo puedo descargar la plantilla que debo diligenciar para el cargue masivo en el SINAS?",
        respuesta: "Para descargar la plantilla a diligenciar en SINAS se recomienda consultar los tutoriales, presentaciones y manuales dispuestos en la página web del SINAS a través del enlace: https://minvivienda.gov.co/viceministerio-de-agua-y-saneamiento-basico/sinas-sistema-de-inversiones-en-agua-potable-y-saneamiento-basico"
      },
      {
        pregunta: "¿Cuál es el tipo de archivo permitido para cargar información al aplicativo?",
        respuesta: "El archivo se encuentra desarrollado en formato Excel versión 2010 en adelante xlsx, excepto el cargue de las iniciativas de los proyectos de inversión para las que se utiliza un formulario."
      },
      {
        pregunta: "¿Cómo eliminar una plantilla que se encuentra cargada y volver a cargar la actualizada?",
        respuesta: "Se recomienda hacer uso del Procedimiento para la Modificación de Información que puede consultar en los documentos dispuestos en la página web del SINAS. Los documentos según plantilla son: Metas APSB (Guía Cargue Masivo Alcaldías pág. 43), Inventario Rural (Presentación Inventario Rural pág. 32), Gestor PDA (Presentación Cargue PDA pág. 22)."
      }
    ]
  },
  {
    categoria: "Estado y Consultas",
    preguntas: [
      {
        pregunta: "¿Dónde puedo consultar el estado en que se encuentra el municipio con los cargues del SINAS?",
        respuesta: "Para consultar el estado de cargue de su municipio, ingrese con su usuario y contraseña, posteriormente diríjase a los módulos de cargue de información donde puede observar el estado de cargue."
      },
      {
        pregunta: "¿Cuál el estado en que se encuentra el municipio con respecto a los cargues que se deben realizar al SINAS?",
        respuesta: "Para conocer el estado del municipio puede ingresar al aplicativo a través del link sinas.minvivienda.gov.co y dirigirse a los módulos de Planeación Estratégica (Gestionar iniciativas de proyectos), Reporte de Información rural (Descargar Plantilla / Cargar Información) y al módulo Reporte de Metas APSB (Cargue de Información)."
      }
    ]
  },
  {
    categoria: "Modificaciones y Actualizaciones",
    preguntas: [
      {
        pregunta: "¿Por qué no se ha autorizado la solicitud de modificación de información?",
        respuesta: "Si su solicitud no ha sido autorizada se debe a que no anexó a la solicitud la certificación firmada por el representante legal del municipio donde justifique la modificación de información."
      },
      {
        pregunta: "¿Cómo puedo adicionar o retirar en la planilla del inventario una comunidad que no está relacionada en la planilla descargada?",
        respuesta: "En caso que existan veredas en su municipio que no se encuentren listados en el archivo descargado, puede incluirlas en la columna Código DANE Vereda con el código DANE del municipio seguido de un código de tres dígitos (501, 502, 503... hasta máximo 999). Si encuentra veredas que no pertenecen a su municipio, puede eliminarlas."
      }
    ]
  },
  {
    categoria: "Capacitación y Soporte",
    preguntas: [
      {
        pregunta: "¿Es posible disponer de un instructivo o material para realizar el cargue de información al SINAS?",
        respuesta: "Usted puede consultar el instructivo y las presentaciones en el siguiente link: https://minvivienda.gov.co/viceministerio-de-agua-y-saneamiento-basico/sinas-sistema-de-inversiones-en-agua-potable-y-saneamiento-basico"
      },
      {
        pregunta: "¿Cómo puedo acceder a una jornada de asistencia técnica para el manejo de la plataforma del SINAS?",
        respuesta: "Ingrese al formulario Solicitudes de Asistencia Técnica y registre sus datos. En cuanto se tenga un número adecuado de participantes le estaremos contactando para invitarlo a la jornada de capacitación."
      },
      {
        pregunta: "¿Dónde puedo solicitar asesoría para aclarar la información a registrar en algunos campos de la plantilla?",
        respuesta: "Puede realizar la solicitud a través del correo institucional al correo electrónico apoyo.sinas@minvivienda.gov.co proponiendo la fecha posible para realizar la jornada y los correos de los participantes."
      }
    ]
  },
  {
    categoria: "Problemas Técnicos",
    preguntas: [
      {
        pregunta: "¿Por qué medio podemos solicitar apoyo sobre la plataforma del SINAS?",
        respuesta: "Para cualquier información de la plataforma comuníquese a través de un correo institucional al correo electrónico apoyo.sinas@minvivienda.gov.co"
      },
      {
        pregunta: "¿El sistema se encuentra fuera de servicio?",
        respuesta: "En estos momentos nos encontramos realizando ajustes al aplicativo, en las próximas horas será restablecido, pedimos disculpas por la incomodidad que esto le pueda ocasionar."
      },
      {
        pregunta: "El sistema presenta un código de error cargando el archivo requiriendo consultar al administrador",
        respuesta: "La solicitud fue escalada al grupo de soporte técnico para que dé pronta respuesta al error presentado."
      }
    ]
  }
];

const FAQSection = () => {
  const [filtro, setFiltro] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [expandirTodas, setExpandirTodas] = useState(false);

  const categorias = preguntasFrecuentes.map(cat => cat.categoria);
  
  const preguntasFiltradas = preguntasFrecuentes
    .map(categoria => ({
      ...categoria,
      preguntas: categoria.preguntas.filter(p => 
        p.pregunta.toLowerCase().includes(filtro.toLowerCase()) ||
        p.respuesta.toLowerCase().includes(filtro.toLowerCase())
      )
    }))
    .filter(categoria => 
      categoria.preguntas.length > 0 && 
      (categoriaSeleccionada === "todas" || categoria.categoria === categoriaSeleccionada)
    );

  const totalPreguntas = preguntasFrecuentes.reduce((total, cat) => total + cat.preguntas.length, 0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Consulte la lista de preguntas frecuentes acerca del aplicativo SINAS. 
            Aquí encontrará respuestas a las dudas más comunes sobre el sistema.
          </p>
          
          {/* Estadística */}
          <div className="bg-primary/5 rounded-lg p-4 inline-block mb-8">
            <p className="text-sm text-muted-foreground">
              <HelpCircle className="inline w-4 h-4 mr-1" />
              <strong>{totalPreguntas}</strong> preguntas frecuentes organizadas en <strong>{categorias.length}</strong> categorías
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={categoriaSeleccionada === "todas" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoriaSeleccionada("todas")}
          >
            Todas
          </Button>
          {categorias.map(categoria => (
            <Button
              key={categoria}
              variant={categoriaSeleccionada === categoria ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaSeleccionada(categoria)}
              className="text-xs"
            >
              {categoria}
            </Button>
          ))}
        </div>

        {/* Controles de expansión */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpandirTodas(!expandirTodas)}
          >
            {expandirTodas ? "Contraer todas" : "Expandir todas"}
          </Button>
        </div>

        {/* Preguntas frecuentes */}
        <div className="max-w-4xl mx-auto space-y-8">
          {preguntasFiltradas.map((categoria, categoriaIndex) => (
            <Card key={categoria.categoria} className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" />
                  {categoria.categoria}
                </CardTitle>
                <CardDescription>
                  {categoria.preguntas.length} pregunta{categoria.preguntas.length !== 1 ? 's' : ''} en esta categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {categoria.preguntas.map((item, index) => (
                    <AccordionItem key={`${categoriaIndex}-${index}`} value={`${categoriaIndex}-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
                        {item.pregunta}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        <div className="pt-2">
                          <div className="whitespace-pre-line">
                            {item.respuesta}
                          </div>
                          {item.respuesta.includes("apoyo.sinas@minvivienda.gov.co") && (
                            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                              <Button size="sm" variant="outline" asChild>
                                <a href="mailto:apoyo.sinas@minvivienda.gov.co">
                                  <Mail className="w-4 h-4 mr-2" />
                                  Contactar soporte
                                </a>
                              </Button>
                            </div>
                          )}
                          {item.respuesta.includes("https://minvivienda.gov.co") && (
                            <div className="mt-3 p-3 bg-secondary/5 rounded-lg">
                              <Button size="sm" variant="outline" asChild>
                                <a 
                                  href="https://minvivienda.gov.co/viceministerio-de-agua-y-saneamiento-basico/sinas-sistema-de-inversiones-en-agua-potable-y-saneamiento-basico" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Ver recursos oficiales
                                </a>
                              </Button>
                            </div>
                          )}
                          {(item as any).documento && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <span className="text-sm font-medium text-blue-900">
                                    Formato GTI-F-14 (Versión 7)
                                  </span>
                                </div>
                                <Button size="sm" variant="default" asChild>
                                  <a href={(item as any).documento} download>
                                    <Download className="w-4 h-4 mr-2" />
                                    Descargar DOC
                                  </a>
                                </Button>
                              </div>
                              <p className="text-xs text-blue-700 mt-2">
                                Documento requerido para solicitud de acceso al SINAS
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No se encontraron resultados */}
        {preguntasFiltradas.length === 0 && filtro && (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-muted-foreground mb-4">
              No hay preguntas que coincidan con "{filtro}"
            </p>
            <Button variant="outline" onClick={() => setFiltro("")}>
              Limpiar búsqueda
            </Button>
          </div>
        )}

        {/* Enlace a FAQ completa */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              ¿No encontraste la respuesta que buscas?
            </h3>
            <p className="text-muted-foreground mb-6">
              Consulta todas las preguntas frecuentes en el sitio oficial o contacta al equipo de soporte.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a 
                  href="https://sinas.minvivienda.gov.co/modulo-de-ayuda-sinas/preguntas-frecuentes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver FAQ oficial completa
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:apoyo.sinas@minvivienda.gov.co">
                  <Mail className="w-4 h-4 mr-2" />
                  Contactar soporte SINAS
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;