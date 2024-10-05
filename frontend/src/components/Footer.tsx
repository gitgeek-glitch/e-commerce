import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About EcoShop</h5>
            <p>
              EcoShop is your one-stop destination for sustainable and eco-friendly products. 
              We're committed to making a positive impact on the environment.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="text-uppercase mb-4">Connect With Us</h5>
            <ul className="list-unstyled social-icons">
              <li><a href="#"><FaFacebookF /> Facebook</a></li>
              <li><a href="#"><FaTwitter /> Twitter</a></li>
              <li><a href="#"><FaInstagram /> Instagram</a></li>
              <li><a href="mailto:info@ecoshop.com"><FaEnvelope /> info@ecoshop.com</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row className="py-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} EcoShop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

