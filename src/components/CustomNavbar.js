import React from 'react';
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp'; // Assicurati che il percorso sia corretto
import '../styles/CustomNavbar.css'; 

function CustomNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <Image src={logo} alt="FarmMetrics Logo" width="40" height="40" className="d-inline-block align-top me-2" />
          FarmMetrics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="me-auto navbar-nav-centered">
          {/* 
            <Nav.Link as={Link} to="/page1">Page 1</Nav.Link>
            <Nav.Link as={Link} to="/page2">Page 2</Nav.Link>
            */}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
