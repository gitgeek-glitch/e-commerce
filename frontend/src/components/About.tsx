import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="mb-4">About EcoShop</h1>
          <p>At EcoShop, we're on a mission to make sustainable living accessible and enjoyable for everyone. Founded in 2020, we've quickly become a leading online destination for eco-friendly products that don't compromise on quality or style.</p>
          <p>Our team of passionate environmentalists and savvy consumers work tirelessly to curate a selection of products that meet our strict standards for sustainability, functionality, and design.</p>
        </Col>
        <Col md={6}>
          <Image src="/api/placeholder/600/400" alt="EcoShop Team" fluid rounded />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Our Values</h2>
          <ul>
            <li>Sustainability: We prioritize products that have a minimal environmental impact.</li>
            <li>Quality: We believe that sustainable products should also be durable and long-lasting.</li>
            <li>Transparency: We provide clear information about the sourcing and production of our products.</li>
            <li>Innovation: We constantly seek out new, innovative solutions for everyday sustainable living.</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">Our Commitment</h2>
          <p>We're committed to reducing our own environmental footprint as a company. That's why we use eco-friendly packaging, partner with carbon-neutral shipping providers, and offset our carbon emissions.</p>
          <p>Join us in our mission to create a more sustainable future, one purchase at a time.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;