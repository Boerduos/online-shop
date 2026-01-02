import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { ViewState } from '../types';

interface LandingProps {
  onNavigate: (view: ViewState) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-slate-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">点燃激情</span>
                <span className="block text-red-500 xl:inline"> 绽放 大帅花火</span>
              </h1>
              <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                为您提供最绚丽的视觉盛宴。无论是节日庆典、浪漫表白还是家庭聚会，大帅花火都能为您增添无限光彩。安全环保，品质保证，让每一个瞬间都闪耀夺目。
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => onNavigate('products')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-all"
                  >
                    挑选烟花
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                     onClick={() => onNavigate('cart')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-100 bg-red-900 hover:bg-red-800 md:py-4 md:text-lg md:px-10 transition-all"
                  >
                    我的购物车
                    <ShoppingBag className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-80"
          src="https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=1200&q=80"
          alt="Fireworks ambience"
        />
      </div>
    </div>
  );
};

export default Landing;