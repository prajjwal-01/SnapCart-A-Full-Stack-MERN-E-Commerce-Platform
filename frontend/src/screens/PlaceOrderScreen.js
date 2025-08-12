import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Store } from '../context/Store';
import axios from 'axios';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = 0.15 * cart.itemsPrice;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data._id}`);
    } catch (err) {
      alert('Failed to place order.');
    }
  };

  return (
    <>
      <h1>Place Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>₹{cart.itemsPrice.toFixed(2)}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping</Col><Col>₹{cart.shippingPrice.toFixed(2)}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax</Col><Col>₹{cart.taxPrice.toFixed(2)}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col><strong>Order Total</strong></Col><Col><strong>₹{cart.totalPrice.toFixed(2)}</strong></Col></Row></ListGroup.Item>
              <ListGroup.Item className="d-grid"><Button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</Button></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;