import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import "../style/dashboard.scss";

import { MdDeleteOutline } from "react-icons/md";

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, avatar, setAvatar, updatePic, isLogged } =
    useAuth();
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState<ILista[]>([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    async function getMovies() {
      const response = await api.get(`/users/movies/${userId}`);
      setMoviesList(response.data);
    }
    getMovies();
  }, []);

  const handleMovieDelete = async (movieId: string) => {
    try {
      await api.delete(`/movies/${movieId}`, config);
      console.log("movie deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    setError("");

    try {
      navigate("/");
      await logout();
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Card>
          <Card.Body>
            <div
              className="user-tab"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                className="user-image-name"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginLeft: "16px",
                  marginRight: "16px",
                }}
              >
                <div
                  id="preview-box"
                  style={{
                    backgroundImage: `url(${avatar})`,
                    marginBottom: "8px",
                  }}
                >
                  <img id="preview-image" src={avatar} alt="" />
                </div>
                <h3>{currentUser.name}</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Link to="/update-profile" id="update">
                  <Button variant="secondary" style={{ margin: "4px" }}>
                    Update Profile
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  style={{ margin: "4px" }}
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ backgroundColor: "#181818" }}>
          <Card.Body>
            <Card.Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>Movies</h4>
                <Link style={{ textDecoration: "none" }} to="/newmovie">
                  Add a new movie
                </Link>
              </div>
            </Card.Title>
            <div>
              <div className="movie-list">
                {moviesList.map((moviesList) => (
                  <Card
                    key={moviesList.id}
                    className="user-movie p-4"
                    style={{ display: "flex", marginBottom: "16px" }}
                  >
                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        style={{
                          background: "#15151575",
                          minWidth: "200px",
                          minHeight: "200px",
                          width: "auto",
                          height: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            maxHeight: "200px",
                            maxWidth: "200px",
                          }}
                          id="image"
                          src={`https://homemoviefestival.herokuapp.com/files/${moviesList.image}`}
                          alt="product"
                        />
                      </div>
                      <div className="info">
                        <p className="title" id="title">
                          <strong>{moviesList.title}</strong>
                        </p>
                        <p>{moviesList.description}</p>

                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigator.clipboard.writeText(moviesList.magnet);
                          }}
                          className="text-muted"
                        >
                          {moviesList.magnet}
                        </p>

                        <p>
                          releaseDate: {moviesList.releaseDate.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <MdDeleteOutline
                        id="delete-icon"
                        size={40}
                        onClick={() => handleMovieDelete(moviesList.id)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
