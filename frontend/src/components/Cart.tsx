import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');  // Added discount code state
  const [discountApplied, setDiscountApplied] = useState<number>(0);  // Track applied discount
  
  useEffect(() => {
    // Simulating fetching cart items from an API or local storage
    const dummyCartItems: CartItem[] = [
      { id: '1', name: 'Eco-friendly Water Bottle', price: 25.99, quantity: 2, image: '/api/placeholder/100/100' },
      { id: '2', name: 'Bamboo Toothbrush Set', price: 12.99, quantity: 1, image: '/api/placeholder/100/100' },
    ];
    setCartItems(dummyCartItems);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0));
  };

  const applyDiscount = () => {
    if (discountCode === 'ECO10') {
      setDiscountApplied(10); // Apply 10% discount for the code ECO10
    } else {
      setDiscountApplied(0);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAfterDiscount = (totalPrice * (1 - discountApplied / 100)).toFixed(2);

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.name} className="mr-2" style={{ width: '50px', height: '50px' }} />
                      {item.name}
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => updateQuantity(item.id, 0)}>Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Discount Code Input */}
            <Form.Group className="my-3">
              <Form.Label>Discount Code</Form.Label>
              <Form.Control
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
              />
              <Button variant="success" onClick={applyDiscount} className="mt-2">
                Apply Discount
              </Button>
            </Form.Group>

            <div className="text-right">
              <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
              {discountApplied > 0 && (
                <h3>Discount: {discountApplied}%</h3>
              )}
              <h3>Total: ${totalAfterDiscount}</h3>
              <Link to="/checkout">
                <Button variant="primary" size="lg" className="mt-3">Proceed to Checkout</Button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default Cart;
