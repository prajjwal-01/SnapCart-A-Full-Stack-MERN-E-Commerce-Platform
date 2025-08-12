import React, { useContext, useEffect, useReducer } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from '../context/Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orders: [],
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    } else {
      const fetchOrders = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const { data } = await axios.get('/api/orders/myorders', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'FETCH_FAIL', payload: 'Failed to fetch orders' });
        }
      };
      fetchOrders();
    }
  }, [userInfo, navigate]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* Placeholder for profile update form */}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;