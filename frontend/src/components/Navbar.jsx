import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, DollarSign } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-blur-sm border-b border-gray-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <DollarSign className="w-6 h-6 text-green-500" />
          <span className="uppercase italic">Fortune Farm</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {location.pathname !== '/' && (
                <Link to="/" className="hover:text-green-300 text-green-400">Main Board</Link>
              )}
              <Link to="/dashboard" className="hover:text-green-300 text-green-400">Dashboard</Link>
              <Link to="/deposit" className="hover:text-green-300 text-green-400">
                Account
              </Link>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{user.user?.name}</span>
              </div>
              <button 
                onClick={logout}
                className="flex items-center space-x-1 hover:text-green-300 text-green-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
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
      </div>
    </nav>
  );
};

export default Navbar;