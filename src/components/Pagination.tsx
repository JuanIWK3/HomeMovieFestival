import React from "react";
import { Link } from "react-router-dom";

interface IPropsPag {
  moviesPerPage: number;
  totalMovies: number;
  paginate: (a: number) => void;
}

export const Pagination = ({
  moviesPerPage,
  totalMovies,
  paginate,
}: IPropsPag) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalMovies / moviesPerPage + 1; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex align-items-center justify-content-center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              style={{ fontSize: "12px" }}
              onClick={() => {
                paginate(number);
              }}
              to={`${number}`}
              className="page-link"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
