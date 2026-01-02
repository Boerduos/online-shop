import React, { useState } from 'react';
import { Product, ViewState } from '../types';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onNavigate: (view: ViewState) => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate, onAddToCart }) => {
  const [showNotification, setShowNotification] = useState(false);
  
  const handleAddToCart = () => {
    onAddToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center text-slate-600 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          查看更多产品
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Image */}
          <div className="w-full aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden shadow-lg bg-slate-100">
             <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>

          {/* Info */}
          <div className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-center mb-4">
               <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{product.name}</h1>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                 ID: {product.id}
               </span>
            </div>
           
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-emerald-600">¥{product.price.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-slate-700 leading-relaxed">{product.longDescription}</p>
            </div>

            <div className="mt-10 flex sm:flex-row flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-emerald-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                加入购物车
              </button>
            </div>

            {/* Notification */}
            {showNotification && (
              <div className="mt-4 rounded-md bg-green-50 p-4 border border-green-200 animate-fade-in">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      成功加入购物车！
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;