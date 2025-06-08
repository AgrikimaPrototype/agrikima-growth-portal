
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Microscope, Users, CheckCircle, Target, Heart } from "lucide-react";

const CompanyOverview = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Manufacturing and distribution across multiple continents",
      content: "Based in Malaysia with offices in Kenya, serving markets in Kenya, Uganda, Rwanda, and Tanzania. Part of the Brandon Group with 20 animal health solution brands."
    },
    {
      icon: Microscope,
      title: "Research & Innovation",
      description: "Natural alternatives to traditional antibiotics",
      content: "Developing effective natural solutions to combat antimicrobial resistance, with products like Advice, Biogar, Agritonic, and Agrivitam leading the market."
    },
    {
      icon: Users,
      title: "Farmer-Centric Approach",
      description: "Supporting both smallholder and commercial farmers",
      content: "Robust distribution channels reaching the smallest farmers, with affordable packaging from 100ml to larger quantities for all farming scales."
    }
  ];

  const missionPoints = [
    { icon: CheckCircle, text: "Promote responsible antibiotic use" },
    { icon: Target, text: "Improve farm productivity" },
    { icon: Heart, text: "Increase human life expectancy" },
    { icon: Users, text: "Enhance animal welfare" },
    { icon: Globe, text: "Support sustainable farming practices" }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sustainable Agriculture Innovation
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Over 35 years of expertise in organic animal health solutions, 
            addressing antimicrobial resistance challenges across Africa and beyond.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="professional-card animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-accent/50 rounded-2xl p-8 lg:p-12 animate-fade-in animation-delay-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                To revolutionize agriculture through sustainable, natural solutions that improve animal welfare, 
                enhance food safety, and support farmer prosperity across Africa and beyond.
              </p>
              <div className="space-y-4">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <point.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable farming"
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
