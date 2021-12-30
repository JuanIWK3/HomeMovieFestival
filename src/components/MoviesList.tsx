import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

export const MoviesList = ({ movies, loading }) => {
  if (loading) {
    return (
      <>
        <Spinner
          animation="border"
          variant="light"
          style={{ height: '50px', position: 'absolute', bottom: '50%' }}
        />
      </>
    );
  }
  return (
    <div className="movie-list">
      {movies.map((movies) => (
        <Card
          key={movies.id}
          className="movie p-4"
          style={{ display: 'flex', marginBottom: '16px' }}
        >
          <div
            style={{
              background: '#15151575',
              minWidth: '200px',
              minHeight: '200px',
              width: 'auto',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
            }}
          >
            <img
              style={{
                height: '100%',
                maxHeight: '200px',
                maxWidth: '200px',
              }}
              id="image"
              src={`http://localhost:4000/files/${movies.image}`}
              alt="product"
            />
          </div>
          <div className="info">
            <p className="title" id="title">
              <strong>{movies.title}</strong>
            </p>
            <p>{movies.description}</p>
            <p>{movies.magnet}</p>
            <p>releaseDate: {movies.releaseDate.substring(0, 10)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
