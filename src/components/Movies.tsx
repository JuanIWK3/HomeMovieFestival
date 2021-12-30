import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { api } from "../services/api";
import "../style/movies.scss";
import { MoviesList } from "./MoviesList";
import { Pagination } from "./Pagination";

interface Imovies {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<Imovies[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(5);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const res = await api.get("movies");
      setMovies(res.data);
      setLoading(false);
    };
    getMovies();
  }, []);

  //* Get Current Movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  //* Change Page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber), window.scrollTo(0, 0);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <MoviesList movies={currentMovies} loading={loading} />
      {!loading && (
        <>
          <Pagination
            moviesPerPage={moviesPerPage}
            totalMovies={movies.length}
            paginate={paginate}
          />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Items per page
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setMoviesPerPage(5), window.scrollTo(0, 0);
                }}
              >
                5
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setMoviesPerPage(10), window.scrollTo(0, 0);
                }}
              >
                10
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setMoviesPerPage(15), window.scrollTo(0, 0);
                }}
              >
                15
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </div>
  );
}
