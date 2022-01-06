import React from "react";
import { Button, Card, Spinner } from "react-bootstrap";

interface IProps {
  movies: {
    id: string;
    title: string;
    description: string;
    releaseDate: string;
    image: string;
    magnet: string;
  }[];
  loading: boolean;
}

export const MoviesList = ({ movies, loading }: IProps) => {
  if (loading) {
    return (
      <>
        <Spinner
          animation="border"
          variant="light"
          style={{
            position: "fixed",
            bottom: "50%",
          }}
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
          style={{ display: "flex", marginBottom: "16px" }}
        >
          <div
            style={{
              background: "#15151575",
              minWidth: "200px",
              minHeight: "200px",
              width: "auto",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <img
              style={{
                height: "100%",
                maxHeight: "200px",
                maxWidth: "200px",
              }}
              id="image"
              src={`https://homemoviefestival.herokuapp.com/files/${movies.image}`}
              alt="product"
            />
          </div>
          <div className="info">
            <p className="title" id="title">
              <strong>{movies.title}</strong>
            </p>
            <p>{movies.description}</p>
            <p>releaseDate: {movies.releaseDate.substring(0, 10)}</p>
            <Button>
              <p
                onClick={() => {
                  navigator.clipboard.writeText(movies.magnet);
                }}
                className="mb-0"
              >
                Copy Magnet Link
              </p>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
