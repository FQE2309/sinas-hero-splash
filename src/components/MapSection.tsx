import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || mapInitialized) return;

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-74.0721, 4.7110], // Bogotá, Colombia
        zoom: 5,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add markers for major cities
      const cities = [
        { name: "Bogotá", coords: [-74.0721, 4.7110] },
        { name: "Medellín", coords: [-75.5636, 6.2442] },
        { name: "Cali", coords: [-76.5225, 3.4516] },
        { name: "Barranquilla", coords: [-74.7813, 10.9639] },
        { name: "Cartagena", coords: [-75.5144, 10.3910] },
      ];

      cities.forEach((city) => {
        new mapboxgl.Marker({ color: "#007BFF" })
          .setLngLat(city.coords as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="text-sm font-semibold">${city.name}</div>`
            )
          )
          .addTo(map.current!);
      });

      setMapInitialized(true);
      setShowTokenInput(false);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section id="cobertura" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Cobertura Nacional
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Presencia del SINAS en todo el territorio colombiano
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {showTokenInput ? (
            <div className="bg-muted/50 rounded-lg p-8 border-2 border-border">
              <div className="flex items-start gap-3 mb-6 text-muted-foreground">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="mb-2">
                    Para visualizar el mapa interactivo, necesitas un token público de Mapbox.
                  </p>
                  <p>
                    Obtén uno gratis en{" "}
                    <a
                      href="https://mapbox.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      mapbox.com
                    </a>
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmitToken} className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Ingresa tu Mapbox Public Token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="default">
                  Cargar Mapa
                </Button>
              </form>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-border">
              <div ref={mapContainer} className="w-full h-[500px]" />
              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-foreground">
                  🇨🇴 Presencia en principales ciudades de Colombia
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
