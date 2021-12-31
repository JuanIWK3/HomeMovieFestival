import React from "react";

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
            <a
              onClick={() => {
                paginate(number);
              }}
              href={`${number}`}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
