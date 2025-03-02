import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/CartContext.jsx';
import { WishlistProvider } from './Context/WishlistContext.jsx';
import { AuthProvider } from "./Context/AuthContext";
import { CheckoutProvider } from './Context/CheckoutContext';
import './index.css';  // ✅ Correct path to TailwindCSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CheckoutProvider>
              <App />
            </CheckoutProvider> 
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
