
import { Package, Globe, Award, Users, TrendingUp, Clock } from "lucide-react";

const ImpactMetrics = () => {
  const metrics = [
    { value: "90+", label: "Quality Products", icon: Package },
    { value: "5+", label: "Continents Served", icon: Globe },
    { value: "20", label: "Health Solution Brands", icon: Award },
    { value: "1000+", label: "Farmers Trained", icon: Users },
    { value: "80%", label: "Target Farmer Uptake", icon: TrendingUp },
    { value: "35+", label: "Years of Expertise", icon: Clock }
  ];

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Transforming agriculture across Africa and beyond through innovation and dedication
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="bg-primary-foreground/10 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto w-fit">
                <metric.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-primary-foreground/80">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <div className="bg-primary-foreground/10 rounded-2xl p-8 lg:p-12 text-center animate-fade-in animation-delay-300">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
            The Future of Sustainable Agriculture
          </h3>
          <p className="text-lg text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
            Looking ahead 5-10 years, we plan to significantly contribute to animal health and crop industries by 
            improving food safety, farm productivity, and animal welfare while reducing antimicrobial resistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
