import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../style/navbar.scss";

export default function Nav() {
  const { isLogged } = useAuth();

  return (
    <nav className="navbar">
      <Link className="navbarItem" to="/">
        Home
      </Link>

      <div className="navbarItems">
        {isLogged ? (
          <>
            <Link className="navbarItem" to="/newmovie">
              New Movie
            </Link>
            <Link className="navbarItem" to="/dashboard">
              User
            </Link>
          </>
        ) : (
          <>
            <Link className="navbarItem" to="/login">
              Log In
            </Link>
            <Link className="navbarItem" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
