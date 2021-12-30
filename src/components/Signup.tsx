import React, { FormEvent, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);

      await signUp(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );

      setSuccess(`Account Created, Redirecting to Log In`);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <div
        className="center"
        style={{ maxWidth: '400px', width: '40vw', minWidth: '300px' }}
      >
        <Card>
          <Card.Body>
            <h2 className="w-100 text-center mt-2">Sign Up</h2>
            {error && (
              <Alert className="h-25" variant="danger">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  autoComplete="on"
                  type="text"
                  ref={nameRef}
                  required
                />
              </Form.Group>
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Sign Up
              </Button>
              {success && (
                <Alert className="h-25 mt-3" variant="success">
                  {success}
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </>
  );
}
