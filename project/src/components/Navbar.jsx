import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, LogOut, User as UserIcon } from 'lucide-react';
import { getCurrentUser, logout } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Car className="h-8 w-8" />
            <span className="text-xl font-bold">Elite Motors</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${isActive('/') ? 'text-blue-400' : 'hover:text-blue-400'}`}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className={`transition-colors ${isActive('/cars') ? 'text-blue-400' : 'hover:text-blue-400'}`}
            >
              Collection
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
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
                <span className="flex items-center text-sm text-gray-300">
                  <UserIcon className="w-4 h-4 mr-2" />
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
                <Link
                  to="/login"
                  className="text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
