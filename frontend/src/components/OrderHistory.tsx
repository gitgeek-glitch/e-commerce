import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  status: string;
  total: number;
  placedAt: string;
  shippingStatus: string;  // New field for tracking shipping status
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulating API call for user's past orders
    const dummyOrders: Order[] = [
      { id: '1', status: 'Delivered', total: 43.98, placedAt: '2023-09-10', shippingStatus: 'Delivered' },
      { id: '2', status: 'Shipped', total: 29.99, placedAt: '2023-09-08', shippingStatus: 'In Transit' },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Your Orders</h1>
        {orders.length === 0 ? (
          <p>You have no past orders.</p>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date Placed</th>
                <th>Shipping Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <Badge bg={order.status === 'Delivered' ? 'success' : 'warning'}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.placedAt}</td>
                  <td>
                    <Badge bg={order.shippingStatus === 'Delivered' ? 'success' : 'info'}>
                      {order.shippingStatus}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="primary" size="sm">Track Order</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </motion.div>
    </Container>
  );
};

export default OrderHistory;