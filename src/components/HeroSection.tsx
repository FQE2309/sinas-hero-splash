import { ChevronLeft, ChevronRight, Waves, Building2, Shield } from "lucide-react";
import heroImage from "@/assets/hero-water-person.jpg";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Sistema de Inversiones en Agua Potable y Saneamiento Básico",
    description: "Planear, definir, sistematizar, priorizar y monitorear proyectos de inversión en infraestructura del sector hídrico en Colombia",
    backgroundImage: "/images/hero/slide1-bg.png",
    foregroundImage: "/images/hero/slide1-fg.png",
  },
  {
    title: "Reportes Públicos SINAS",
    description: "Consulta la información reportada por alcaldías y gestores a nivel nacional sobre proyectos e inversiones",
    backgroundImage: "/images/hero/slide2-bg.png",
    foregroundImage: "/images/hero/slide2-fg.png",
  },
  {
    title: "Transparencia y Gestión Eficiente",
    description: "Facilitamos consultas de indicadores sectoriales y condiciones de acceso a agua y saneamiento básico",
    backgroundImage: "/images/hero/slide3-bg.png",
    foregroundImage: "/images/hero/slide3-fg.png",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Efecto parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sistema de animaciones escalonadas - iniciar inmediatamente para el hero
  useEffect(() => {
    // Para el hero, iniciar animaciones inmediatamente
    setIsVisible(true);
    // Animaciones escalonadas
    setTimeout(() => setAnimationStep(1), 100);   // Contenedor principal
    setTimeout(() => setAnimationStep(2), 300);   // Título
    setTimeout(() => setAnimationStep(3), 500);   // Descripción
    setTimeout(() => setAnimationStep(4), 700);   // Indicadores
    setTimeout(() => setAnimationStep(5), 900);   // Botón
    setTimeout(() => setAnimationStep(6), 400);   // Imagen
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary pt-32 md:pt-40"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].backgroundImage}
          alt="Gestión del agua en Colombia"
          className="w-full h-full object-cover opacity-30 transition-all duration-700"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            scale: `${1 + scrollY * 0.0005}`
          }}
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className={`text-primary-foreground transition-all duration-1000 ease-out transform ${
            animationStep >= 1 ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 opacity-80 scale-98'
          }`}>
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wide transition-all duration-1000 ease-out transform ${
              animationStep >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-80 scale-98'
            }`}>
              {slides[currentSlide].title}
            </h2>
            <p className={`text-lg sm:text-xl mb-8 transition-all duration-800 ease-out transform ${
              animationStep >= 3 ? 'translate-y-0 opacity-95' : 'translate-y-4 opacity-70'
            }`}>
              {slides[currentSlide].description}
            </p>
            
            {/* Carousel Controls */}
            <div className={`flex gap-3 mb-8 transition-all duration-700 ease-out transform ${
              animationStep >= 4 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-90'
            }`}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 ${
                    index === currentSlide
                      ? "w-12 bg-primary-foreground shadow-lg animate-pulse"
                      : "w-3 bg-primary-foreground/40 hover:bg-primary-foreground/70 hover:w-6 hover:shadow-md"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Call to Action Button */}
            <div className={`mb-8 transition-all duration-800 ease-out transform ${
              animationStep >= 5 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'
            }`}>
              <Button 
                variant="hero-outline" 
                size="lg" 
                className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-primary-foreground/10 backdrop-blur-sm" 
                asChild
              >
                <a href="#reportes">
                  Ver Reportes Públicos
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Image Preview (visible on large screens) */}
          <div className={`hidden lg:block transition-all duration-1200 ease-out transform ${
            animationStep >= 6 ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-90 scale-95'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl glassmorphism p-1 hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-breathing group">
              <img
                src={slides[currentSlide].foregroundImage}
                alt="Gestión sostenible del agua"
                className="w-full h-auto rounded-xl transition-all duration-700 group-hover:scale-110"
              />
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Efecto de ondas al hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-blue-400/20 to-green-400/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-primary-foreground p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg opacity-80 hover:opacity-100"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-200 hover:-translate-x-0.5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-primary-foreground p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg opacity-80 hover:opacity-100"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6 transition-transform duration-200 hover:translate-x-0.5" />
      </button>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z"
            fill="hsl(var(--background))"
            fillOpacity="0.3"
          />
          <path
            d="M0,80 C240,48 480,112 720,80 C960,48 1200,112 1440,80 L1440,120 L0,120 Z"
            fill="hsl(var(--background))"
            fillOpacity="0.5"
          />
          <path
            d="M0,96 C240,112 480,80 720,96 C960,112 1200,80 1440,96 L1440,120 L0,120 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
