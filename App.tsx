import React, { useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import OrderSuccess from './components/OrderSuccess';
import { PRODUCTS } from './data';
import { ViewState, Product, CartItem, Order } from './types';
import { ShoppingCart } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('detail');
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } else {
      setCart(prevCart => prevCart.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (order: Order) => {
    setLastOrder(order);
    handleClearCart();
    handleNavigate('success');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      {/* Show Header on all pages except Success */}
      {currentView !== 'success' && (
        <Header 
          currentView={currentView} 
          onNavigate={handleNavigate} 
          cart={cart}
        />
      )}

      <main>
        {currentView === 'landing' && (
          <Landing onNavigate={handleNavigate} />
        )}

        {currentView === 'products' && (
          <ProductList 
            products={PRODUCTS} 
            onSelectProduct={handleSelectProduct} 
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'cart' && (
          <Cart 
            cart={cart}
            onNavigate={handleNavigate}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentView === 'success' && (
          <OrderSuccess 
            order={lastOrder}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Mobile Floating Cart Button (Visible only on mobile) */}
      {currentView !== 'cart' && currentView !== 'success' && (
        <button
          onClick={() => handleNavigate('cart')}
          className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 rounded-full shadow-lg text-white sm:hidden hover:bg-emerald-700 transition-transform active:scale-95 flex items-center justify-center"
          aria-label="查看购物车"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-emerald-600 bg-white border border-emerald-600 rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default App;