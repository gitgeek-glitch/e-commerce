import React, { useState } from 'react';
import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  paymentMethod: string;
}

const Checkout: React.FC = () => {
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'stripe',
  });

  // Fix the type of event handler to match React-Bootstrap's expectations
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Order submitted:', form);
  };

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Checkout</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h2 className="h5 mb-4">Shipping Information</h2>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Payment Method Selection */}
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                      <option value="stripe">Stripe</option>
                      <option value="paypal">PayPal</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Place Order
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h2 className="h5 mb-4">Order Summary</h2>
                <p className="d-flex justify-content-between"><span>Subtotal:</span> <span>$38.98</span></p>
                <p className="d-flex justify-content-between"><span>Shipping:</span> <span>$5.00</span></p>
                <hr />
                <p className="d-flex justify-content-between"><strong>Total:</strong> <strong>$43.98</strong></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Checkout;
