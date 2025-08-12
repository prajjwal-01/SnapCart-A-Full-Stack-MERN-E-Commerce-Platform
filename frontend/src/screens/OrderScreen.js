import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Store } from '../context/Store';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: 'Order Not Found' });
      }
    };

    if (!userInfo) {
      return;
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
              <p><strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}><Image src={item.image} alt={item.name} rounded fluid /></Col>
                      <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                      <Col md={4}>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              {order.itemsPrice && (
                <ListGroup variant="flush">
                  <ListGroup.Item><Row><Col>Items</Col><Col>₹{order.itemsPrice.toFixed(2)}</Col></Row></ListGroup.Item>
                  <ListGroup.Item><Row><Col>Shipping</Col><Col>₹{order.shippingPrice.toFixed(2)}</Col></Row></ListGroup.Item>
                  <ListGroup.Item><Row><Col>Tax</Col><Col>₹{order.taxPrice.toFixed(2)}</Col></Row></ListGroup.Item>
                  <ListGroup.Item><Row><Col><strong>Order Total</strong></Col><Col><strong>₹{order.totalPrice.toFixed(2)}</strong></Col></Row></ListGroup.Item>
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;