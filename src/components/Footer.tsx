
import { Link } from "react-router-dom";
import { Leaf, MapPin, Phone, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white section-padding">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Agrikima</h3>
                <p className="text-primary/80">Making Growth Happen</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Distinguished leader in organic animal health solutions and sustainable crop management, 
              serving farmers across five continents with innovative, natural alternatives.
            </p>
            <div className="flex space-x-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-primary/20 p-2 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-primary/20 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-primary/20 p-2 rounded-lg">
                <Award className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-300 hover:text-primary transition-colors flex items-center"><ArrowRight className="w-4 h-4 mr-2" />Home</Link></li>
              <li><Link to="/products" className="text-slate-300 hover:text-primary transition-colors flex items-center"><ArrowRight className="w-4 h-4 mr-2" />Products</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-primary transition-colors flex items-center"><ArrowRight className="w-4 h-4 mr-2" />About Us</Link></li>
              <li><Link to="/farmer-forum" className="text-slate-300 hover:text-primary transition-colors flex items-center"><ArrowRight className="w-4 h-4 mr-2" />Farmer Forum</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-primary transition-colors flex items-center"><ArrowRight className="w-4 h-4 mr-2" />Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-white">Africa Office:</p>
                  <p className="text-slate-300">Sky Park Plaza Westlands</p>
                  <p className="text-slate-300">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <p className="text-slate-300">+254 20 208 9181</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <p className="text-slate-300">Info@agrikima.co.ke</p>
              </div>
              <div className="flex items-start space-x-3 mt-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-white">Factory:</p>
                  <p className="text-slate-300">Port Klang, Malaysia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-slate-300">
            © 2024 Agrikima. All rights reserved. Making Growth Happen across Africa and beyond.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
