import { Mail, Linkedin, Twitter, Github, Scale } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const quickLinks = [
    { label: 'Home', path: 'home' },
    { label: 'About', path: 'about' },
    { label: 'Operations', path: 'operations' },
    { label: 'Lawyers', path: 'lawyers' },
    { label: 'Disclaimer', path: 'disclaimer' }
  ];

  const handleLinkClick = (path) => {
    if (onNavigate) onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0E13] border-t border-white/5 mt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Scale className="w-8 h-8 text-[#00C2FF]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">
                JurisAssist
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making legal language simple and accessible with AI-powered insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-400 hover:text-[#00C2FF] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@jurisassist.com</span>
              </li>
              <li className="text-gray-400 text-sm">Karachi, Pakistan</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 JurisAssist. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Guided by Madam Mubeena Ahsan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
