
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black text-white py-3' : 'bg-white text-black py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="font-display text-xl tracking-tight">
          30under30.ai
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#what-we-do" className="text-sm font-medium hover:opacity-70 transition-opacity">
            What We Do
          </a>
          <a href="#why-us" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Why Us
          </a>
          <a href="#process" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Process
          </a>
          <Link 
            to="/apply" 
            className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`absolute top-full left-0 w-full bg-white md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-60 border-b border-gray-200' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <a 
            href="#what-we-do" 
            className="text-sm font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            What We Do
          </a>
          <a 
            href="#why-us" 
            className="text-sm font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Why Us
          </a>
          <a 
            href="#process" 
            className="text-sm font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Process
          </a>
          <Link 
            to="/apply" 
            className="bg-black text-white px-6 py-2 text-center text-sm font-medium hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
