import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, DollarSign, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-95 backdrop-blur-sm border-b border-gray-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            <span className="uppercase italic">Fortune Farm</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {location.pathname !== '/' && (
                  <Link to="/" className="hover:text-green-300 text-green-400">Main Board</Link>
                )}
                <Link to="/dashboard" className="hover:text-green-300 text-green-400">Dashboard</Link>
                <Link to="/deposit" className="hover:text-green-300 text-green-400">Account</Link>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">{user.user?.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-green-300 text-green-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3 pt-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-2 py-1 bg-gray-700 rounded">
                    <User className="w-4 h-4" />
                    <span>{user.user?.name}</span>
                  </div>
                  {location.pathname !== '/' && (
                    <Link 
                      to="/" 
                      className="text-green-400 hover:text-green-300 px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Main Board
                    </Link>
                  )}
                  <Link 
                    to="/dashboard" 
                    className="text-green-400 hover:text-green-300 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/deposit" 
                    className="text-green-400 hover:text-green-300 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 px-2 py-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white hover:text-gray-300 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;