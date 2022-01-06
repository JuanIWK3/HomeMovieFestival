import React, { SyntheticEvent, useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { api } from "../services/api";
import "../style/movies.scss";
import { MoviesList } from "./MoviesList";
import { Pagination } from "./Pagination";

interface IMovies {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [allMovies, setAllMovies] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(window.location.pathname.replace("/", ""))
  );
  const [moviesPerPage, setMoviesPerPage] = useState(5);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      const res = await api.get("movies");

      setMovies(res.data);
      setAllMovies(res.data);

      setLoading(false);
    };

    getMovies();

    if (isNaN(currentPage)) {
      setCurrentPage(1);
    }
  }, []);

  //* Get Current Movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  //* Change Page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber), window.scrollTo(0, 0);
  };

  const handleSearch = (e: HTMLInputElement) => {
    const search = e.value;
    const filterMovies = (movies: IMovies[], search: string) => {
      return movies.filter(
        (movie) =>
          movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    };
    setMovies(filterMovies(allMovies, search));
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-between">
      {!loading && (
        <FormControl
          placeholder="Search movies"
          style={{
            backgroundColor: "#333",
            color: "#fff",
            top: "70px",
            width: "80vw",
          }}
          type="text"
          onChange={(e: SyntheticEvent) => {
            handleSearch(e.currentTarget as HTMLInputElement);
          }}
        />
      )}
      <MoviesList movies={currentMovies} loading={loading} userPage={false} />
      {!loading && (
        <>
          <Pagination
            moviesPerPage={moviesPerPage}
            totalMovies={movies.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}
