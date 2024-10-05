import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface SustainabilityStats {
  carbonSaved: number;
  wasteReduced: number;
}

const SustainabilityTracker: React.FC = () => {
  const [stats, setStats] = useState<SustainabilityStats>({ carbonSaved: 0, wasteReduced: 0 });

  useEffect(() => {
    // Simulating API call to fetch sustainability metrics
    const dummyStats: SustainabilityStats = {
      carbonSaved: 120,  // Measured in kg of CO2
      wasteReduced: 50,  // Measured in kg of waste
    };
    setStats(dummyStats);
  }, []);

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Your Sustainability Impact</h1>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h2>Carbon Savings</h2>
                <p>You have saved {stats.carbonSaved} kg of CO2 through your purchases.</p>
                <ProgressBar now={stats.carbonSaved} max={200} label={`${stats.carbonSaved} kg`} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h2>Waste Reduction</h2>
                <p>You have reduced {stats.wasteReduced} kg of waste through your eco-friendly choices.</p>
                <ProgressBar now={stats.wasteReduced} max={100} label={`${stats.wasteReduced} kg`} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default SustainabilityTracker;