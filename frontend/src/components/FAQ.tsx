import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What makes EcoShop products eco-friendly?",
      answer: "All products sold on EcoShop are carefully selected based on their environmental impact. We consider factors such as materials used, production methods, packaging, and overall lifecycle. Our products are made from sustainable materials, produced using eco-friendly methods, and designed for longevity and recyclability."
    },
    {
      question: "How do you ensure the quality of your products?",
      answer: "We have a rigorous vetting process for all our suppliers and products. Each item is tested for quality and durability before being added to our catalog. We also regularly review customer feedback to ensure ongoing quality."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Please note that items must be in their original condition and packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. You can check the specific shipping options and costs at checkout."
    },
    {
      question: "How do you minimize the environmental impact of shipping?",
      answer: "We use eco-friendly packaging materials and partner with carbon-neutral shipping providers whenever possible. We also optimize our packaging to reduce waste and shipping weight."
    }
  ];

  return (
    <Container className="my-5">
      <h1 className="mb-4">Frequently Asked Questions</h1>
      <Accordion>
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQ;