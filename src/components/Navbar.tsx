import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import '../style/navbar.scss';

export default function Nav() {
  const { isLogged } = useAuth();

  return (
    <nav className="navbar">
      <div>
        <Link className="navbarItems" to="/">
          Home
        </Link>
      </div>
      <div>
        {isLogged ? (
          <>
            <Link className="navbarItems" to="/dashboard">
              User
            </Link>
          </>
        ) : (
          <>
            <Link className="navbarItems" to="/login">
              Log In
            </Link>
            <Link className="navbarItems" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
