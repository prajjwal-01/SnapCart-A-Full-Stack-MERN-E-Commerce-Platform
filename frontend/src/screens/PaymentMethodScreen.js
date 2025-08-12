import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
    userInfo,
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
    if (!userInfo) {
      navigate('/signin');
    }
  }, [shippingAddress, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="UPI"
                label="UPI"
                value="UPI"
                checked={paymentMethodName === 'UPI'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethodScreen;