import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ShoppingCart, User, BarChart3, Heart, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../App';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portal', path: '/student-portal', icon: ShoppingCart },
    { name: 'My Orders', path: '/orders', icon: History },
    { name: 'Donations', path: '/donations', icon: Heart },
    { name: 'Dashboard', path: '/admin', icon: BarChart3 },
    { name: 'About', path: '/about', icon: User },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'shadow-lg border-white/40' : 'bg-white/40 border-transparent shadow-none'
        }`}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
              <Leaf size={24} />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              Canteen
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === link.path
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {/* <link.icon size={16} /> */}
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-2" />
            {isAuthenticated ? (
              <>
                <span className="px-4 py-2 text-sm font-medium text-slate-700">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary py-2 px-5 text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 z-40 md:hidden"
          >
            <div className="glass rounded-3xl p-6 shadow-2xl border-white/40">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-emerald-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon size={20} />
                    <span className="font-semibold">{link.name}</span>
                  </Link>
                ))}
                {isAuthenticated ? (
                  <button
                    className="px-4 py-4 rounded-2xl text-center text-red-600 hover:bg-red-50 font-semibold transition-all mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="px-4 py-4 rounded-2xl text-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-semibold transition-all mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="btn-primary w-full mt-2 py-4 rounded-2xl text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
