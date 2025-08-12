import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Store } from '../context/Store';
import axios from 'axios';

const SigninScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">Sign In</Button>
            </div>
            <div className="mb-3">
              New customer?{' '}
              <Link to={`/signup`}>Create your account</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SigninScreen;