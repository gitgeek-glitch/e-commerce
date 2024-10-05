import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Alert, Tabs, Tab, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
  specifications: { [key: string]: string };
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);  // State to manage reviews
  const [newReview, setNewReview] = useState<Review>({ user: '', rating: 0, comment: '' });

  useEffect(() => {
    // Simulating API call for product details
    const dummyProduct: Product = {
      id: id || '1',
      name: 'Eco-friendly Water Bottle',
      price: 25.99,
      description: 'Reusable stainless steel water bottle.',
      image: '/api/placeholder/600/400',
      features: ['Durable', 'Eco-friendly'],
      specifications: {
        Capacity: '20 oz',
        Material: 'Stainless Steel',
      },
    };
    setProduct(dummyProduct);

    // Simulating API call for product reviews
    const dummyReviews: Review[] = [
      { user: 'Alice', rating: 5, comment: 'Amazing eco-friendly product!' },
      { user: 'Bob', rating: 4, comment: 'Great product, but packaging could be better.' },
    ];
    setReviews(dummyReviews);
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviews([...reviews, newReview]);
    setNewReview({ user: '', rating: 0, comment: '' });
  };

  return (
    <Container className="my-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {product && (
          <>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={6}>
                <h1>{product.name}</h1>
                <p className="lead">${product.price.toFixed(2)}</p>
                <p>{product.description}</p>
                {/* Additional product details like specifications and features */}
                <h4>Customer Reviews</h4>
                {reviews.length === 0 ? (
                  <p>No reviews yet. Be the first to leave a review!</p>
                ) : (
                  reviews.map((review, index) => (
                    <div key={index} className="mb-4">
                      <strong>{review.user}</strong> <span>Rating: {review.rating}/5</span>
                      <p>{review.comment}</p>
                    </div>
                  ))
                )}

                <h4>Leave a Review</h4>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newReview.user}
                      onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="5"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit Review
                  </Button>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default ProductDetails;