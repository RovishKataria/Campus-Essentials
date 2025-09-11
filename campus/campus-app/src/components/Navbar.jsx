import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBook, FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Courses', path: '/courses', icon: <FiBook /> },
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid />, protected: true },
    { name: 'Profile', path: '/profile', icon: <FiUser />, protected: true },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Campus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.protected && !isLoggedIn) return null;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
            
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="btn-gradient text-white px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                if (link.protected && !isLoggedIn) return null;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors py-2"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}
              
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors py-2"
                  >
                    <FiLogIn />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="btn-gradient text-white px-4 py-2 rounded-lg text-center"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors py-2"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
