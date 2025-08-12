import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Store } from '../context/Store';
import axios from 'axios';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      alert('Failed to create account. User may already exist.');
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
          <h1>Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control required onChange={(e) => setName(e.target.value)} />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <div className="mb-3">
              <Button type="submit">Sign Up</Button>
            </div>
            
            <div className="mb-3">
              Already have an account?{' '}
              <Link to={`/signin`}>Sign In</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;