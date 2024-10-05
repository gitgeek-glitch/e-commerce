import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import OTP from './OTP';
import './Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      // Store the userId from the response
      setRegisteredUserId(data.userId);
      setShowOtpInput(true);  // This should display the OTP input component
  
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set the error message
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };
  

  const handleOtpSuccess = () => {
    setShowSuccessMessage(true);
    setShowOtpInput(false);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleOtpError = (error: string) => {
    setErrorMessage(error);
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={8}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Create Your Account</h2>
                
                {errorMessage && (
                  <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    {errorMessage}
                  </Alert>
                )}

                {showSuccessMessage && (
                  <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
                    Registration successful! Redirecting to login...
                  </Alert>
                )}

                {showOtpInput ? (
                  <OTP
                    userId={registeredUserId}
                    onSuccess={handleOtpSuccess}
                    onError={handleOtpError}
                  />
                ) : (
                  <Form onSubmit={handleRegisterSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter your full name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label><FaEnvelope className="me-2" />Email address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label><FaLock className="me-2" />Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label><FaLock className="me-2" />Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Check type="checkbox" label="I agree to the Terms of Service and Privacy Policy" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Create Account
                    </Button>
                  </Form>
                )}

                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-decoration-none">Sign in here</Link>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;