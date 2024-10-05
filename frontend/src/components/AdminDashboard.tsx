import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, stock: 0, category: '' });

  useEffect(() => {
    // Simulating API call for fetching product data
    const dummyProducts: Product[] = [
      { id: '1', name: 'Eco-friendly Water Bottle', price: 25.99, stock: 100, category: 'Kitchen' },
      { id: '2', name: 'Bamboo Toothbrush Set', price: 12.99, stock: 200, category: 'Bathroom' },
    ];
    setProducts(dummyProducts);
  }, []);

  const handleAddProduct = () => {
    // Simulate adding a new product (this would be sent to backend)
    setProducts([...products, { id: (products.length + 1).toString(), ...newProduct }]);
    setNewProduct({ name: '', price: 0, stock: 0, category: '' });
  };

  const handleDeleteProduct = (id: string) => {
    // Simulate product deletion (this would delete from backend)
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Admin Dashboard</h1>
        
        {/* Product Table */}
        <h2>Manage Products</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add New Product Form */}
        <h2>Add New Product</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
          </Form.Group>
          <Button variant="success" onClick={handleAddProduct}>
            Add Product
          </Button>
          </Form>
        
        {/* Product Analytics */}
        <h2 className="mt-5">Product Analytics</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Total Sales</th>
              <th>Popular Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Eco-friendly Water Bottle</td>
              <td>150</td>
              <td>Kitchen</td>
            </tr>
            <tr>
              <td>Bamboo Toothbrush Set</td>
              <td>100</td>
              <td>Bathroom</td>
            </tr>
          </tbody>
        </Table>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;