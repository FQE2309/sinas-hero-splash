import { Button } from "@/components/ui/button";
import { Droplet, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-sinas.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ondas de agua representando sostenibilidad y gestión ambiental"
          className="w-full h-full object-cover opacity-20 wave-animation"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Icon */}
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-foreground/20 rounded-full blur-xl animate-pulse" />
              <div className="relative glassmorphism rounded-full p-6">
                <Droplet className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Sistema Nacional de Información
            <span className="block mt-2 bg-gradient-to-r from-primary-foreground via-primary-light to-primary-foreground bg-clip-text text-transparent">
              Ambiental y Sanitaria
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Transparencia y sostenibilidad en la gestión del agua y el saneamiento básico en Colombia
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="xl"
              className="group"
              aria-label="Explorar proyectos de saneamiento y agua"
            >
              Explorar proyectos
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              aria-label="Acceder al sistema SINAS"
            >
              Acceder al sistema
            </Button>
          </div>

          {/* Stats or badges (optional) */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-primary-foreground/80">
            <div className="glassmorphism px-6 py-3 rounded-full">
              <p className="text-sm font-medium">🌊 Gestión del Agua</p>
            </div>
            <div className="glassmorphism px-6 py-3 rounded-full">
              <p className="text-sm font-medium">♻️ Sostenibilidad</p>
            </div>
            <div className="glassmorphism px-6 py-3 rounded-full">
              <p className="text-sm font-medium">🇨🇴 Nacional</p>
            </div>
          </div>
        </div>
      </div>

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
