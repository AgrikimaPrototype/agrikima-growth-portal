
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">About Agrikima</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making Growth Happen - A distinguished leader in organic animal health solutions and sustainable agriculture
          </p>
        </div>

        {/* Company Introduction */}
        <div className="mb-16">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Our Story</CardTitle>
              <CardDescription>Building sustainable agriculture for the future</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Agrikima is a distinguished leader in organic animal health solutions and organic crop management 
                industries, with a rich history of innovation and global reach. Based in Malaysia, our state-of-the-art 
                factory produces over 90 high-quality animal health solution products, alongside organic fertilisers and 
                pesticides, promoting sustainable practices worldwide.
              </p>
              <p className="text-gray-700 mb-4">
                We market our products in more than five continents. Around 3 years ago, Agrikima made the decision to 
                have a deep focus on the African continent, establishing an office in Nairobi, Kenya. The Nairobi office 
                has since established markets in Kenya, Uganda, Rwanda, and Tanzania through various partners.
              </p>
              <p className="text-gray-700">
                Agrikima operates under the umbrella of the Brandon Group of companies, headquartered in Istanbul, Turkey. 
                Under Brandon, there are 20 animal health solution brands with manufacturing facilities in Turkey, Jordan, 
                and Malaysia.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To revolutionize agriculture through sustainable, natural solutions that improve animal welfare, 
                enhance food safety, and support farmer prosperity across Africa and beyond. We are committed to 
                addressing antimicrobial resistance challenges while promoting environmental sustainability.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To be the leading provider of organic agricultural solutions globally, empowering farmers with 
                innovative, natural alternatives that ensure food security, environmental protection, and 
                sustainable agricultural practices for future generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sustainable Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Sustainable Animal Health Solutions
          </h2>
          <Card className="border-green-200">
            <CardContent className="p-8">
              <p className="text-gray-700 mb-4">
                Agrikima largely focuses on unique animal health solutions to address antimicrobial resistance 
                challenges, particularly antibiotics. Since 1987, there has not been any development of new antibiotics. 
                This is mainly due to the heavy capital investment and long periods of validation associated with 
                the development and full approval of antibiotics.
              </p>
              <p className="text-gray-700 mb-4">
                Due to bacterial mutations and overreliance on 33+ year-old antibiotics, resistance has made them 
                less effective. Agrikima found great reason to research alternative natural solutions, yielding 
                very successful results and effective products currently on the market.
              </p>
              <p className="text-gray-700">
                Our solutions like Advice have been effective in managing viral problems like Newcastle, Gumboro, 
                and Infectious Bronchitis. Other products like Biogar, Agritonic, and Agrivitam have yielded better 
                value for money and saved many small-holder farmers from significant losses.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Market Approach */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Market Approach and Farmer Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Distribution Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  With Africa's economic structure in mind, Agrikima focuses on both smallholder and big farmers alike. 
                  We've established robust distribution channels to reach the smallest farmer in the market.
                </p>
                <p className="text-gray-700">
                  In Kenya, we prefer small regional distributors and stockists rather than big national distributors, 
                  ensuring coverage of small farmers in villages. This approach significantly impacts subsistence farmers 
                  who have the highest combined animal population.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Farmer Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  During fiscal year 2023/2024, Agrikima conducted well-attended farmer trainings through innovative 
                  mobilization efforts. These trainings were done in partnership with major players like Kenchic, 
                  Unga Limited, and Equity Bank.
                </p>
                <p className="text-gray-700">
                  We also focus on one-on-one training with farmer groups through organizations like Kiambu Poultry 
                  Farmers Association and Ngong Farmers Association, extending to neighboring countries through our distributors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Goals */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">The Future</h2>
          <Card className="border-green-200">
            <CardContent className="p-8">
              <p className="text-gray-700 mb-6">
                We plan for the next 5-10 years to significantly contribute to animal health and crop industries by:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Improving food safety by promoting responsible antibiotic use</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Improving farm productivity through animal production optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Increasing human life expectancy by reducing chemical residues</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Reducing unnecessary use of synthetic antibiotics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Significantly improving animal welfare with safe treatments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Scaling up natural product uptake by 80% of African farmers</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Offices */}
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Global Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Africa Office</CardTitle>
                <CardDescription>Nairobi, Kenya</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <p>Sky Park Plaza Westlands</p>
                  <p>P.O. Box 7773, 00200 Nairobi, Kenya</p>
                  <p>📧 Info@agrikima.co.ke</p>
                  <p>📞 +254 20 208 9181, +254 20 208 9182</p>
                  <p>📱 +254 (0) 111 410 639</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Manufacturing Facility</CardTitle>
                <CardDescription>Port Klang, Malaysia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <p>A63, Jalan FZ2, Precint 3</p>
                  <p>KS12 42920, Klang, Selangor</p>
                  <p>Malaysia</p>
                  <p className="mt-4 text-sm text-green-600">
                    Strategic location for seamless shipment to various continents
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
