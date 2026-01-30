
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 h-20 flex items-center px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
              <i className="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none uppercase">
                AI DIGITAL <span className="text-blue-400">EMPIRE</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-blue-300 font-medium">
                Empowering Thoughtful Leaders
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link to="/" className="hover:text-blue-400 transition-colors uppercase tracking-wider">Home</Link>
            <a href="#bundles" className="hover:text-blue-400 transition-colors uppercase tracking-wider">Courses</a>
            <Link to="/admin" className="hover:text-blue-400 transition-colors uppercase tracking-wider">Admin</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative pt-24 px-6 flex flex-col gap-6 text-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest text-white">Home</Link>
            <a href="#bundles" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest text-white">Courses</a>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-widest text-white">Admin Portal</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
