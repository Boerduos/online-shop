import React from 'react';
import { Order, ViewState } from '../types';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessProps {
  order: Order | null;
  onNavigate: (view: ViewState) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ order, onNavigate }) => {
  if (!order) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-emerald-600">
          <CheckCircle className="h-20 w-20" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          订单已提交！
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          感谢您的购买。我们已经收到您的订单信息。
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="border-b border-slate-200 pb-5 mb-5">
            <h3 className="text-lg leading-6 font-medium text-slate-900">
              确认号码: <span className="font-mono text-emerald-600">{order.id}</span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              请保存此号码以备查询。
            </p>
          </div>

          <div className="space-y-4">
             <div>
               <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">订单详情</h4>
               <ul className="mt-3 divide-y divide-slate-200">
                 {order.items.map((item) => (
                   <li key={item.product.id} className="py-3 flex justify-between">
                     <div className="flex items-center">
                        <span className="text-slate-800 font-medium">{item.product.name}</span>
                        <span className="ml-2 text-slate-500 text-sm">x {item.quantity}</span>
                     </div>
                     <span className="text-slate-900">¥{(item.product.price * item.quantity).toFixed(2)}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">总计金额</span>
                <span className="text-xl font-bold text-emerald-600">¥{order.total.toFixed(2)}</span>
             </div>

             <div className="bg-slate-50 p-4 rounded-md mt-6">
                <h4 className="text-sm font-bold text-slate-900 mb-2">配送信息:</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><span className="font-medium text-slate-700">收件人:</span> {order.shippingAddress.fullName}</p>
                  <p><span className="font-medium text-slate-700">电话:</span> {order.shippingAddress.phone}</p>
                  <p><span className="font-medium text-slate-700">地址:</span> {order.shippingAddress.fullAddress}</p>
                </div>
             </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => onNavigate('products')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              继续购物
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;