import React, { useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import OrderSuccess from './components/OrderSuccess';
import { PRODUCTS } from './data';
import { ViewState, Product, CartItem, Order } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {currentView !== 'landing' && currentView !== 'success' && (
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
    </div>
  );
};

export default App;