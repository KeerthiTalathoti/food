import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-white overflow-hidden relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Leaf size={24} />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight">
                WasteNot
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Smart college canteen management system designed to reduce food waste and support hunger relief efforts.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/student-portal" className="hover:text-emerald-400 transition-colors">Student Portal</Link></li>
              <li><Link to="/donations" className="hover:text-emerald-400 transition-colors">Donation Center</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Resources</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Project</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability Report</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500" />
                <span>support@wastenot.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500" />
                <span>+1 (234) 567-890</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-800">
              <p className="text-sm text-slate-500 italic">
                “Eat smart, waste less.”
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 WasteNot Project. All rights reserved. Built for DTI.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
