import { Link, useLocation } from 'react-router-dom';
import { Car } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Car className="h-8 w-8" />
            <span className="text-xl font-bold">Elite Motors</span>
          </Link>

          <div className="flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${isActive('/') ? 'text-blue-400' : 'hover:text-blue-400'}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${isActive('/about') ? 'text-blue-400' : 'hover:text-blue-400'}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${isActive('/contact') ? 'text-blue-400' : 'hover:text-blue-400'}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
