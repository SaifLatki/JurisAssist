import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Scale, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Lawyers', path: '/lawyers' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'About', path: '/about' },
    { label: 'Operations', path: '/operations' },
  ];

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Icon Button (navigates to login)
  const UserAvatarButton = (
    <button
      className="relative group p-0 ml-2 rounded-full overflow-hidden focus:outline-none"
      onClick={() => navigate('/login')}
      aria-label="Go to login page"
      type="button"
    >
      <span className="absolute inset-0 bg-gradient-to-tr from-[#00C2FF]/90 to-[#00FF88]/90 opacity-80 group-hover:opacity-100 transition-opacity rounded-full blur"></span>
      <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#0D1117] border-2 border-[#00C2FF]/40 shadow-lg shadow-[#00C2FF]/20 group-hover:scale-105 transition-all">
        <User className="w-5 h-5 text-[#00C2FF] group-hover:text-[#00FF88] transition-colors duration-200" />
      </span>
    </button>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D1117]/95 backdrop-blur-md shadow-lg shadow-[#00C2FF]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <Scale className="w-8 h-8 text-[#00C2FF] group-hover:text-[#00FF88] transition-colors" />
              <div className="absolute inset-0 bg-[#00C2FF] blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">
              JurisAssist
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00C2FF]/20 text-[#00C2FF] shadow-lg shadow-[#00C2FF]/20'
                      : 'text-gray-300 hover:text-[#00C2FF] hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {UserAvatarButton}
          </div>

          {/* Mobile Menu Button + User Icon */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-[#00C2FF] hover:bg-white/5 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {UserAvatarButton}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1117]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00C2FF]/20 text-[#00C2FF]'
                      : 'text-gray-300 hover:text-[#00C2FF] hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
