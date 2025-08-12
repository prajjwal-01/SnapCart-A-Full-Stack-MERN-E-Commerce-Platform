import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Store } from '../context/Store';

const ProductScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { id: productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product Not Found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, qty },
    });
    navigate('/cart');
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="d-grid">
                <Button
                  onClick={addToCartHandler}
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;