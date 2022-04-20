import React, { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { api } from "../services/api";

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
  const [copyMessage, setCopyMessage] = useState("Magnet");

  // const copyClicked = () => {};

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleMovieDelete = async (movieId: string) => {
    try {
      await api.delete(`/movies/${movieId}`, config);
      console.log("movie deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const changeButton = (e: any, magnet: string) => {
    const { id } = e.currentTarget;
    const button = document.getElementById(id);
    button.innerText = "Copied!";
    setTimeout(() => {
      button.innerText = "Magnet";
    }, 1000);
    navigator.clipboard.writeText(magnet);
  };

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
        <p
          style={{
            position: "fixed",
            bottom: "45%",
          }}
        >
          Waiting for API
        </p>
      </>
    );
  }
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          className="movie p-4"
          style={{
            display: "flex",
            marginBottom: "16px",
            justifyContent: "space-between",
          }}
        >
          <div className="movie">
            <p className="title text-center" id="title">
              <strong>{movie.title}</strong>
            </p>
            <div
              style={{
                background: "#15151575",
                width: "auto",
                height: "auto",
                minWidth: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.3rem",
                marginBottom: "16px",
              }}
              id="image"
            >
              <div
                style={{
                  height: "150px",
                  width: "150px",
                  backgroundImage: `url(https://homemoviefestivalbucket.s3.us-east-2.amazonaws.com/${movie.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "0.3rem",
                }}
              />
            </div>
            <div className="info">
              <p id="description">{movie.description}</p>
              <p>
                Release Date:{" "}
                {movie.releaseDate.substring(0, 10).replaceAll("-", "/")}
              </p>
              <a href={`${movie.magnet}`} target="blank">
                <Button
                  id={movie.id}
                  onClick={(e) => {
                    changeButton(e, movie.magnet);
                  }}
                  variant="dark"
                  style={{ marginBottom: "0px", width: "170px" }}
                >
                  {copyMessage}
                </Button>
              </a>
            </div>
          </div>
          {userPage && (
            <MdDeleteOutline
              onClick={() => {
                handleMovieDelete(movie.id);
              }}
              id="delete-icon"
            />
          )}
        </Card>
      ))}
    </div>
  );
};
