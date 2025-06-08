
const ImpactMetrics = () => {
  const metrics = [
    { value: "90+", label: "Quality Products", icon: "🧪" },
    { value: "5+", label: "Continents Served", icon: "🌍" },
    { value: "20", label: "Health Solution Brands", icon: "🏭" },
    { value: "1000+", label: "Farmers Trained", icon: "👩‍🌾" },
    { value: "80%", label: "Target Farmer Uptake", icon: "📈" },
    { value: "35+", label: "Years of Expertise", icon: "⭐" }
  ];

  return (
    <section className="py-20 bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-green-200 max-w-3xl mx-auto">
            Transforming agriculture across Africa and beyond through innovation and dedication
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-green-200">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-green-700 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            The Future of Sustainable Agriculture
          </h3>
          <p className="text-lg text-green-200 max-w-4xl mx-auto">
            Looking ahead 5-10 years, we plan to significantly contribute to animal health and crop industries by 
            improving food safety, farm productivity, and animal welfare while reducing antimicrobial resistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
