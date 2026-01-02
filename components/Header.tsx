import React from 'react';
import { ShoppingCart, Flame } from 'lucide-react';
import { ViewState, CartItem } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cart: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, cart }) => {
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer gap-2" 
            onClick={() => onNavigate('landing')}
          >
            <div className="bg-red-600 p-2 rounded-lg">
              <Flame className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">大帅花火</span>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('products')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'products' || currentView === 'detail' 
                  ? 'text-red-600' 
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              选购烟花
            </button>
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-slate-600 hover:text-red-600 transition-colors"
              aria-label="查看购物车"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;