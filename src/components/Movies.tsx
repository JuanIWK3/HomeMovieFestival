import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { api } from '../services/api';
import '../style/movies.scss';
import { MoviesList } from './MoviesList';
import { Pagination } from './Pagination';

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
  const [moviesPerPage] = useState(10);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const res = await api.get('movies');
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
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column">
      <MoviesList movies={currentMovies} loading={loading} />
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        paginate={paginate}
      />
    </div>
  );
}
