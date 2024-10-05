import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  ecoLabel?: string;  // Optional ecoLabel field for frontend logic
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCertification, setSelectedCertification] = useState<string>('');  // Eco certification filter
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Simulating API call with a static product list
    const dummyProducts: Product[] = [
      { id: '1', name: 'Eco-friendly Water Bottle', price: 25.99, description: 'Reusable stainless steel water bottle', image: '/api/placeholder/300/200', category: 'Kitchen', ecoLabel: 'organic' },
      { id: '2', name: 'Bamboo Toothbrush Set', price: 12.99, description: 'Set of 4 biodegradable bamboo toothbrushes', image: '/api/placeholder/300/200', category: 'Bathroom', ecoLabel: 'recyclable' },
      { id: '3', name: 'Organic Cotton Tote Bag', price: 18.99, description: 'Durable and washable shopping bag', image: '/api/placeholder/300/200', category: 'Accessories', ecoLabel: 'organic' },
      { id: '4', name: 'Solar-powered Charger', price: 39.99, description: 'Portable solar charger for devices', image: '/api/placeholder/300/200', category: 'Electronics', ecoLabel: 'zero-waste' },
    ];
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);

    const uniqueCategories = Array.from(new Set(dummyProducts.map(product => product.category)));
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedCertification === '' || product.ecoLabel === selectedCertification)
    );
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, selectedCertification, products]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCertificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCertification(e.target.value);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Our Products</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={selectedCertification} onChange={handleCertificationChange}>
            <option value="">All Certifications</option>
            <option value="organic">Organic</option>
            <option value="recyclable">Recyclable</option>
            <option value="zero-waste">Zero Waste</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {filteredProducts.map(product => (
          <Col md={3} key={product.id} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  {product.ecoLabel && (
                    <Card.Text className="mt-auto">
                      <strong>Eco-friendly: {product.ecoLabel}</strong>
                    </Card.Text>
                  )}
                  <Card.Text className="mt-auto">
                    <strong>${product.price.toFixed(2)}</strong>
                  </Card.Text>
                  <Link to={`/product/${product.id}`} className="mt-2">
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
