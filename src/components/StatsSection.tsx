import { Card } from "@/components/ui/card";
import { Users, Building2, TrendingUp, Droplets } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    icon: Building2,
    value: 1122,
    label: "Municipios atendidos",
    suffix: "",
    description: "A nivel nacional",
  },
  {
    icon: Droplets,
    value: 3450,
    label: "Proyectos de agua",
    suffix: "+",
    description: "En ejecución",
  },
  {
    icon: TrendingUp,
    value: 2.8,
    label: "Billones invertidos",
    prefix: "$",
    suffix: "",
    decimals: 1,
    description: "En saneamiento básico",
  },
  {
    icon: Users,
    value: 45,
    label: "Millones de beneficiarios",
    suffix: "M",
    description: "Colombianos atendidos",
  },
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Impacto Nacional en Cifras
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparencia en la gestión del agua y saneamiento básico en Colombia
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                  </div>
                </div>
                <div className="mb-2">
                  {inView && (
                    <p className="text-4xl lg:text-5xl font-bold text-primary">
                      {stat.prefix}
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.decimals || 0}
                        separator=","
                        decimal="."
                      />
                      {stat.suffix}
                    </p>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
