import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import authService from '../services/authService';
import '../styles/Login.css'; 

function Login({ onLoginSuccess }) {
   // Prepopola username e password con i valori predefiniti per velocizzare accesso
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authService.login(username, password)) {
      onLoginSuccess();
      navigate('/home');
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <div className="login-logo"></div>
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            Login
          </Button>
        </Form>
      </div>
      <footer className="login-footer">
        FarmMetrics sviluppato da Nardelli Antonio matr. 0312301110 © 2024
      </footer>
    </Container>
  );
}

export default Login;
