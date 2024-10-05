import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';  
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaLeaf, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbars: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the user is authenticated by checking localStorage for the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]); // Recheck authentication on location change (page navigation)

  // Logout function (removes JWT token and sets isAuthenticated to false)
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token from localStorage
    setIsAuthenticated(false);  // Update authentication status
    window.location.href = '/';  // Redirect to the landing page
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <FaLeaf className="brand-icon" /> EcoShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>Products</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
          </Nav>

          {/* Conditional rendering based on login status */}
          {isAuthenticated ? (
            <>
              <Nav>
                <Nav.Link as={Link} to="/cart" onClick={() => setExpanded(false)}><FaShoppingCart /> Cart</Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </Nav>
            </>
          ) : (
            <>
              <Nav>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}><FaUser /> Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>Sign Up</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
