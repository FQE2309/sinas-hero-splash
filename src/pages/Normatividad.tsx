import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NormatividadSection from "@/components/NormatividadSection";
import PageTransition from "@/components/ui/PageTransition";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Normatividad = () => {
  // Scroll automático al inicio
  useScrollToTop();
  
  // SEO para la página de Normatividad
  useSEO({
    title: 'Normatividad | SINAS - Marco Legal del Sector Hídrico',
    description: 'Consulta la normatividad y marco legal que rige el sector de agua potable y saneamiento básico en Colombia. Documentos oficiales, decretos, resoluciones y guías técnicas.',
    keywords: 'normatividad, marco legal, decretos, resoluciones, agua potable, saneamiento básico, regulación, documentos oficiales',
    url: 'https://sinas.minvivienda.gov.co/normatividad',
    type: 'article'
  });

  return (
    <PageTransition>
      <main className="min-h-screen pt-32">
        <Navbar />
        <Breadcrumbs />
        <NormatividadSection />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Normatividad;