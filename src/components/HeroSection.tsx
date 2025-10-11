import { ChevronLeft, ChevronRight, Waves, Building2, Shield } from "lucide-react";
import heroImage from "@/assets/hero-water-person.jpg";
import { useState } from "react";

const slides = [
  {
    title: "SINAS ya interopera con el SIRH del IDEAM",
    description: "Integración de sistemas para mejor gestión del recurso hídrico en Colombia",
    image: heroImage,
  },
  {
    title: "Transparencia en la gestión del agua",
    description: "Sistema Nacional de Información para el desarrollo sostenible del país",
    image: heroImage,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary pt-32 md:pt-40">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          alt="Gestión del agua en Colombia"
          className="w-full h-full object-cover opacity-30 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground animate-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-95">
              {slides[currentSlide].description}
            </p>
            
            {/* Carousel Controls */}
            <div className="flex gap-2 mb-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-12 bg-primary-foreground"
                      : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Image Preview (visible on large screens) */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl glassmorphism p-1">
              <img
                src={slides[currentSlide].image}
                alt="Gestión sostenible del agua"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-primary-foreground p-3 rounded-full transition-all"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-primary-foreground p-3 rounded-full transition-all"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6" />
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
