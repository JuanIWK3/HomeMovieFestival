import React from 'react';
import { Alert } from 'react-bootstrap';

export default function NotFound() {
  return (
    <div style={{ height: '100vh' }}>
      <Alert
        style={{
          position: 'fixed',
          right: '50%',
          transform: 'translate(50%)',
          bottom: '50%',
        }}
        variant="danger"
      >
        404 Not Found
      </Alert>
    </div>
  );
}
