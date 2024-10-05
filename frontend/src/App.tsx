import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbars';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';  // New Component
import AdminDashboard from './components/AdminDashboard';  // New Component
import SustainabilityTracker from './components/SustainabilityTracker';  // New Component

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/orders" element={<OrderHistory />} />  {/* Order History Route */}
          <Route path="/admin" element={<AdminDashboard />} />  {/* Admin Dashboard Route */}
          <Route path="/sustainability" element={<SustainabilityTracker />} />  {/* Sustainability Tracker Route */}
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;