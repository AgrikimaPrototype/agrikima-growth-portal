
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Agrikima</h3>
            <p className="text-blue-200 mb-4">Making Growth Happen</p>
            <p className="text-sm text-slate-300 mb-4">
              Distinguished leader in organic animal health solutions and sustainable crop management, 
              serving farmers across five continents with innovative, natural alternatives.
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl">🌱</span>
              <span className="text-2xl">🐄</span>
              <span className="text-2xl">🌍</span>
              <span className="text-2xl">💙</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-slate-300 hover:text-blue-300 transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-blue-300 transition-colors">About Us</Link></li>
              <li><Link to="/farmer-forum" className="text-slate-300 hover:text-blue-300 transition-colors">Farmer Forum</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-blue-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div>
                <p className="font-semibold">Africa Office:</p>
                <p>Sky Park Plaza Westlands</p>
                <p>Nairobi, Kenya</p>
                <p>+254 20 208 9181</p>
                <p>Info@agrikima.co.ke</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Factory:</p>
                <p>Port Klang, Malaysia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-300 text-sm">
            © 2024 Agrikima. All rights reserved. Making Growth Happen across Africa and beyond.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
