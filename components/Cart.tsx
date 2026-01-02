import React, { useState } from 'react';
import { CartItem, ViewState, Address, Order } from '../types';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onNavigate: (view: ViewState) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onNavigate, onUpdateQuantity, onClearCart, onPlaceOrder }) => {
  const [address, setAddress] = useState<Address>({
    fullName: '', phone: '', fullAddress: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const taxRate = 0.08; // 8% Sales Tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      subtotal,
      tax,
      total,
      shippingAddress: address,
      date: new Date().toISOString()
    };
    
    // Simulate API call to merchant
    console.log("Order placed:", newOrder);
    onPlaceOrder(newOrder);
  };

  const handleCancelOrder = () => {
    if (window.confirm("确定要取消订单并清空购物车吗？")) {
      onClearCart();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">购物车</h1>
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            查看更多产品
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-medium text-slate-500">您的购物车是空的</h2>
            <p className="mt-2 text-slate-400">去添加一些心仪的商品吧！</p>
            <button
              onClick={() => onNavigate('products')}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              浏览商品
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            
            {/* Left Column: Cart Items & Address */}
            <div className="lg:col-span-7">
              {/* Cart Items List */}
              <div className="bg-white shadow-sm rounded-lg mb-8 overflow-hidden">
                <ul className="divide-y divide-slate-200">
                  {cart.map((item) => (
                    <li key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 border border-slate-200 rounded-md overflow-hidden">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-slate-900">
                            <h3>{item.product.name}</h3>
                            <p className="ml-4">¥{(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">ID: {item.product.id}</p>
                          <p className="mt-1 text-sm text-slate-500">单价: ¥{item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center border border-slate-300 rounded-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 text-slate-600 hover:bg-slate-100 rounded-l-md"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value) || 0)}
                              className="w-12 text-center border-none p-1 focus:ring-0 text-slate-900 font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 text-slate-600 hover:bg-slate-100 rounded-r-md"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, 0)}
                            className="font-medium text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            移除
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200">
                  <span className="text-slate-600">想清空所有商品?</span>
                  <button
                    type="button"
                    onClick={handleCancelOrder}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    取消订单 / 清空购物车
                  </button>
                </div>
              </div>

              {/* Address Form (Simplified) */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">收货信息</h3>
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                  
                  {/* Full Name */}
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-slate-700">收件人姓名</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={e => setAddress({...address, fullName: e.target.value})}
                      className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="例如：张三"
                    />
                  </div>

                  {/* Contact Info: Phone Only */}
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-slate-700">联系电话</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={e => setAddress({...address, phone: e.target.value})}
                      className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="手机号码"
                    />
                  </div>

                  {/* Simplified Address Field */}
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-slate-700">详细收货地址</label>
                    <textarea
                      required
                      rows={3}
                      value={address.fullAddress}
                      onChange={e => setAddress({...address, fullAddress: e.target.value})}
                      className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="省/市/区/街道门牌号"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-24">
                <h2 className="text-lg font-medium text-slate-900 mb-6">订单摘要</h2>
                
                <div className="flow-root">
                  <dl className="-my-4 text-sm divide-y divide-slate-200">
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-slate-600">商品小计</dt>
                      <dd className="font-medium text-slate-900">¥{subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-slate-600">销售税 (8%)</dt>
                      <dd className="font-medium text-slate-900">¥{tax.toFixed(2)}</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between border-t border-slate-200">
                      <dt className="text-base font-bold text-slate-900">订单总计</dt>
                      <dd className="text-base font-bold text-emerald-600">¥{total.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="rounded-md bg-yellow-50 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CreditCard className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">支付说明</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>本项目不提供在线支付。下单后，商家将联系您进行线下支付和发货安排。</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  >
                    确认下单
                  </button>
                </div>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;