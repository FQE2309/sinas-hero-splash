import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ReportesSection from "@/components/ReportesSection";
import AcercaSection from "@/components/AcercaSection";
import InteroperabilidadSection from "@/components/InteroperabilidadSection";
import NormatividadSection from "@/components/NormatividadSection";
import AyudaSection from "@/components/AyudaSection";
import FAQSection from "@/components/FAQSection";
import GlosarioSection from "@/components/GlosarioSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  // SEO para la página principal
  useSEO({
    title: 'SINAS - Sistema de Inversiones en Agua Potable y Saneamiento Básico | Ministerio de Vivienda',
    description: 'Plataforma oficial del Ministerio de Vivienda para planear, definir, sistematizar y monitorear proyectos de inversión en infraestructura del sector hídrico en Colombia. Consulta reportes públicos, indicadores y datos de agua potable y saneamiento.',
    keywords: 'SINAS, agua potable, saneamiento básico, Colombia, Ministerio de Vivienda, infraestructura hídrica, inversión pública, reportes, indicadores, gestión del agua',
    url: 'https://sinas.minvivienda.gov.co/',
    type: 'website'
  });

  return (
    <PageTransition>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ReportesSection />
        <AcercaSection />
        <NormatividadSection />
        <InteroperabilidadSection />
        <AyudaSection />
        <FAQSection />
        <GlosarioSection />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Index;
