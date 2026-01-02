import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">精选商品</h2>
          <p className="mt-4 text-lg text-slate-600">浏览我们的独家收藏，找到您的心仪之物。</p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
              <div className="aspect-w-4 aspect-h-3 bg-slate-200 group-hover:opacity-90 transition-opacity">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-emerald-600">¥{product.price.toFixed(2)}</p>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="inline-flex items-center px-4 py-2 border border-emerald-600 text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  >
                    选择查看
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;