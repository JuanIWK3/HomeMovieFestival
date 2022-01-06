import React, { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";

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
  userPage: boolean;
}

export const MoviesList = ({ movies, loading, userPage }: IProps) => {
  const [copyMessage, setCopyMessage] = useState("Copy Magnet Link");

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
          style={{
            display: "flex",
            marginBottom: "16px",
            justifyContent: "space-between",
          }}
        >
          <div className="movie" style={{ display: "flex" }}>
            <div
              style={{
                background: "#15151575",

                width: "auto",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
              }}
              id="image"
            >
              <img
                style={{
                  maxHeight: "150px",
                  maxWidth: "150px",
                }}
                id="image"
                src={`https://homemoviefestival.herokuapp.com/files/${movies.image}`}
                alt="product"
              />
            </div>
            <div className="info">
              <p className="title text-center" id="title">
                <strong>{movies.title}</strong>
              </p>
              <p id="description">{movies.description}</p>
              <p>
                Release Date:{" "}
                {movies.releaseDate.substring(0, 10).replaceAll("-", "/")}
              </p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(movies.magnet);
                  setCopyMessage("Copied!");
                  setTimeout(() => {
                    setCopyMessage("Copy Magnet Link");
                  }, 2000);
                }}
                style={{ marginBottom: "0px", width: "170px" }}
              >
                {copyMessage}
              </Button>
            </div>
          </div>
          <MdDeleteOutline id="delete-icon" />
        </Card>
      ))}
    </div>
  );
};
