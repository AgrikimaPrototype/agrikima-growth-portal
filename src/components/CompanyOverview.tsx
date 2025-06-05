
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyOverview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Sustainable Agriculture Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 35 years of expertise in organic animal health solutions, 
            addressing antimicrobial resistance challenges across Africa and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center">
                🌍 Global Reach
              </CardTitle>
              <CardDescription>
                Manufacturing and distribution across multiple continents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Based in Malaysia with offices in Kenya, serving markets in Kenya, Uganda, Rwanda, and Tanzania. 
                Part of the Brandon Group with 20 animal health solution brands.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center">
                🔬 Research & Innovation
              </CardTitle>
              <CardDescription>
                Natural alternatives to traditional antibiotics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Developing effective natural solutions to combat antimicrobial resistance, 
                with products like Advice, Biogar, Agritonic, and Agrivitam leading the market.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center">
                👥 Farmer-Centric Approach
              </CardTitle>
              <CardDescription>
                Supporting both smallholder and commercial farmers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Robust distribution channels reaching the smallest farmers, 
                with affordable packaging from 100ml to larger quantities for all farming scales.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-green-800 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                To revolutionize agriculture through sustainable, natural solutions that improve animal welfare, 
                enhance food safety, and support farmer prosperity across Africa and beyond.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Promote responsible antibiotic use</li>
                <li>✅ Improve farm productivity</li>
                <li>✅ Increase human life expectancy</li>
                <li>✅ Enhance animal welfare</li>
                <li>✅ Support sustainable farming practices</li>
              </ul>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable farming"
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
