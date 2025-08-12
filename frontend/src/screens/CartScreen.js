import React, { useContext } from 'react';
import { Store } from '../context/Store';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/signin?redirect=/shipping');
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </div>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>₹{item.price}</Col>
                    <Col md={2}>{item.qty}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
                    items) : ₹
                    {cartItems
                      .reduce((a, c) => a + c.price * c.qty, 0)
                      .toFixed(2)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item className="d-grid">
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;