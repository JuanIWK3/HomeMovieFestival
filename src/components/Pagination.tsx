import React from 'react';

export const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
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
              href={`!#${number}`}
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
