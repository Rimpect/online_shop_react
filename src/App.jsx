import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === product.selectedSize
      );

      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };


  const updateCart = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={cartItems.length} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route 
              path="/product/:id" 
              element={<ProductDetail addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={<Cart cartItems={cartItems} updateCart={updateCart} />} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;