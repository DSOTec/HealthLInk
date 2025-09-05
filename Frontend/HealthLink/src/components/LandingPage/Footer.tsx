import React from 'react';
import { Twitter, Linkedin, Github, Heart } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const platformLinks = [
    { name: 'For Patients', href: '#patients' },
    { name: 'For Doctors', href: '#doctors' },
    { name: 'AI Assistant', href: '#ai' },
    { name: 'Security', href: '#security' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Contact Us', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'GitHub', icon: Github, href: '#github' }
  ];

  return (
    <footer id="footer" className={`bg-slate-800 dark:bg-gray-950 text-white transition-colors duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">
                MarpeLink
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 leading-relaxed max-w-md mb-6">
              Revolutionizing healthcare through decentralized telemedicine, AI-powered diagnostics, and blockchain security.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5 text-gray-300 hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 MarpeLink. All rights reserved. Built on blockchain for your security.
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-gray-400 text-sm">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                />
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-r-lg transition-colors duration-200 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Links */}
        <div className="mt-8 pt-8 border-t border-slate-700 md:hidden">
          <div className="grid grid-cols-2 gap-4 text-center">
            <a href="#privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-400 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>AI Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;