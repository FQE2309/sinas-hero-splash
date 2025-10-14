import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteroperabilidadSection from "@/components/InteroperabilidadSection";
import PageTransition from "@/components/ui/PageTransition";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Interoperabilidad = () => {
  // Scroll automático al inicio
  useScrollToTop();
  
  // SEO para la página de Interoperabilidad
  useSEO({
    title: 'Interoperabilidad | SINAS - Sistema de Inversiones en Agua Potable',
    description: 'Descubre las entidades oferentes y demandantes que interactúan con SINAS para la gestión del agua potable y saneamiento básico en Colombia. Información sobre integraciones y servicios web.',
    keywords: 'interoperabilidad, SINAS, entidades oferentes, entidades demandantes, servicios web, API, integración, agua potable',
    url: 'https://sinas.minvivienda.gov.co/interoperabilidad',
    type: 'article'
  });

  return (
    <PageTransition>
      <main className="min-h-screen pt-32">
        <Navbar />
        <Breadcrumbs />
        <InteroperabilidadSection />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Interoperabilidad;