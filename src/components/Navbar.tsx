import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { nav } from "../style/global";

export default function Nav() {
  const { isLogged } = useAuth();

  return (
    <nav style={nav.navbar}>
      <div>
        <Link to="/" style={nav.navbarItems}>
          Home
        </Link>
      </div>
      <div>
        {isLogged ? (
          <>
            <Link to="/user" style={nav.navbarItems}>
              User
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={nav.navbarItems}>
              Log In
            </Link>
            <Link to="/signup" style={nav.navbarItems}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
