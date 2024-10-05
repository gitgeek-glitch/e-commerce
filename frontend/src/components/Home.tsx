import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <Carousel className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/api/placeholder/1200/400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to EcoShop</h3>
            <p>Your one-stop destination for sustainable products</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/api/placeholder/1200/400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>New Arrivals</h3>
            <p>Check out our latest eco-friendly products</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        <h2 className="text-center mb-4">Featured Products</h2>
        <Row>
          {[1, 2, 3, 4].map((product) => (
            <Col key={product} md={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`/api/placeholder/300/200`} />
                <Card.Body>
                  <Card.Title>Eco Product {product}</Card.Title>
                  <Card.Text>A sustainable solution for everyday use.</Card.Text>
                  <Link to={`/product/${product}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <section className="about-us bg-light py-5 my-5">
            <Container>
              <h2 className="text-center mb-4">About EcoShop</h2>
              <p className="text-center">
                At EcoShop, we're committed to providing high-quality, sustainable products that help reduce environmental impact. 
                Our curated selection of eco-friendly items makes it easy for you to make environmentally conscious choices in your everyday life.
              </p>
              <div className="text-center mt-4">
                <Link to="/about">
                  <Button variant="success">Learn More About Us</Button>
                </Link>
              </div>
            </Container>
          </section>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <section className="testimonials my-5">
            <h2 className="text-center mb-4">What Our Customers Say</h2>
            <Row>
              {[
                { name: 'Jane Doe', text: 'EcoShop has transformed the way I shop. Their products are not only eco-friendly but also high-quality!' },
                { name: 'John Smith', text: 'I love how easy EcoShop makes it to find sustainable alternatives to everyday products.' },
                { name: 'Emily Brown', text: 'The customer service at EcoShop is top-notch. They really care about their customers and the environment.' }
              ].map((testimonial, index) => (
                <Col key={index} md={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Text>"{testimonial.text}"</Card.Text>
                      <footer className="blockquote-footer mt-2">{testimonial.name}</footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <section className="newsletter bg-primary text-white py-5 my-5">
            <Container>
              <h2 className="text-center mb-4">Stay Updated</h2>
              <p className="text-center">Subscribe to our newsletter for the latest eco-friendly products and sustainability tips.</p>
              <Row className="justify-content-center">
                <Col md={6}>
                  <form className="d-flex">
                    <input type="email" className="form-control me-2" placeholder="Enter your email" />
                    <Button variant="light" type="submit">Subscribe</Button>
                  </form>
                </Col>
              </Row>
            </Container>
          </section>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Home;
