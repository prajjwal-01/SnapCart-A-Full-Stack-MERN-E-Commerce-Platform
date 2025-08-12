import React, { useContext } from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'; // Import NavDropdown
import { Link } from 'react-router-dom';
import { Store } from '../context/Store';

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">SnapCart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger" className="ms-1">
                    {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/signin">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;