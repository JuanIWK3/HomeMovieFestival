import React from "react";
import { Button } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { api } from "../../services/api";
import { Container, Image, Loading, Spinner } from "./styles";

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

  if (loading) {
    return (
      <Loading>
        <Spinner />
        <p>Waiting for API</p>
      </Loading>
    );
  }
  return (
    <Container>
      {movies.map((movie) => (
        <div className="movie" key={movie.id}>
          <p className="title">
            <strong>{movie.title}</strong>
          </p>

          <Image
            src={`url(https://homemoviefestivalbucket.s3.us-east-2.amazonaws.com/${movie.image})`}
          />

          <p className="description">{movie.description}</p>
          <p>
            Release Date:{" "}
            {movie.releaseDate.substring(0, 10).replaceAll("-", "/")}
          </p>
          <a href={`${movie.magnet}`} target="blank">
            <Button variant="dark">Magnet</Button>
          </a>

          {userPage && (
            <MdDeleteOutline
              onClick={() => {
                handleMovieDelete(movie.id);
              }}
              className="delete-icon"
            />
          )}
        </div>
      ))}
    </Container>
  );
};
