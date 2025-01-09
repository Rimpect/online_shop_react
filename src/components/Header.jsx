import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

function Header({ cartItemCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Мужская одежда</Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/products" className="hover:text-gray-300">Каталог</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="hover:text-gray-300 relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/products" className="block hover:text-gray-300">Каталог</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  cartItemCount: PropTypes.number.isRequired,
};

export default Header;