import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface OTPProps {
  userId: string | null;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const OTP: React.FC<OTPProps> = ({ userId, onSuccess, onError }) => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed');
      }

      onSuccess(); // Call onSuccess to indicate OTP was verified successfully
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        onError(error.message); // Call onError to pass the error message back
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <Form onSubmit={handleOtpSubmit}>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Enter OTP</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the OTP sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Verify OTP
      </Button>
    </Form>
  );
};

export default OTP;
