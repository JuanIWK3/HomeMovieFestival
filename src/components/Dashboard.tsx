import React, { SyntheticEvent, useEffect, useState } from "react";
import { Alert, Button, Card, Modal, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import "../style/dashboard.scss";

import {
  validateFileSize,
  validateFileType,
} from "../services/fileValidatorService";
import FileService from "../services/fileService";
import { MoviesList } from "./MoviesList";

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadFormError, setUploadFormError] = useState<string>("");
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

  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [localStorage.getItem("avatar")]);

  const handleLogOut = async () => {
    setError("");

    try {
      navigate("/");
      await logout();
    } catch (error) {
      setError("Failed to log out");
    }
  };

  const handleClose = () => {
    setShow(false);
    setFile(null);
    setPreviewURL("");
  };

  const handleShow = () => (setShow(true), setError(""));

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;

    if (!file || file.length === 0) {
      setUploadFormError("");
      setFile(null);
      setPreviewURL("");
      return;
    }

    const validFileSize = await validateFileSize(file[0].size);
    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0].name)
    );

    if (!validFileSize.isValid) {
      setUploadFormError(validFileSize.errorMessage);
    }
    if (!validFileType.isValid) {
      setUploadFormError(validFileType.errorMessage);
    }
    if (uploadFormError && validFileSize.isValid) {
      setUploadFormError("");
    }
    if (uploadFormError && validFileType.isValid) {
      setUploadFormError("");
    }

    setFile(file[0]);
    const fileURL = URL.createObjectURL(file[0]);
    setPreviewURL(fileURL);
  };

  const handleUpdatePic = async () => {
    const data = new FormData();

    data.append("avatar", file);

    try {
      setLoading(true);
      await updatePic(data);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      try {
        api.get(`/users/${currentUser.id}`, config).then((res) => {
          localStorage.setItem(
            "avatar",
            `https://homemoviefestival.herokuapp.com/files/${res.data.avatar}`
          );
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);

    setTimeout(() => {
      setAvatar(localStorage.getItem("avatar"));
    }, 1000);

    handleClose();
    handleShow();

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 1000);
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
                  onClick={handleShow}
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
            <MoviesList movies={moviesList} loading={false} userPage={true} />
            <div className="w-100 text-center mt-2">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Change your profile picture</Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="input-group" style={{ width: "100%" }} />
                  {!loading ? (
                    <>
                      <p>Preview</p>
                      <div
                        style={{ backgroundImage: `url(${previewURL})` }}
                        id="preview-box"
                      >
                        <img id="preview-image" src={previewURL} alt="" />
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Loading</p>
                      <Spinner
                        id="preview-box"
                        style={{
                          backgroundImage: `url(https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1)`,
                          height: "150px",
                          width: "150px",
                        }}
                        animation="border"
                      />
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <div>
                    {uploadFormError && (
                      <p className="text-danger">{uploadFormError}</p>
                    )}
                    <div>
                      <input
                        type="file"
                        onChange={(e: SyntheticEvent) =>
                          handleFileUpload(e.currentTarget as HTMLInputElement)
                        }
                      />
                    </div>
                  </div>
                  {error && (
                    <Alert className="h-25" variant="danger">
                      {error}
                    </Alert>
                  )}
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    onClick={handleUpdatePic}
                    disabled={!file}
                    type="submit"
                    variant="primary"
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
