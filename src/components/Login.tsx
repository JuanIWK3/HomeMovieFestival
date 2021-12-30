import React, { FormEvent, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import '../style/global.scss';

export default function Login() {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (e) {
      setError('Failed to sign in');
    }
  }

  return (
    <>
      <div
        className="center"
        style={{
          maxWidth: '400px',
          width: '40vw',
          minWidth: '300px',
        }}
      >
        <Card>
          <Card.Body>
            <h2 className="w-100 text-center mt-2">Log In</h2>
            {error && (
              <Alert className="h-25" variant="danger">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoComplete="on"
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button className="w-100 mt-2" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
