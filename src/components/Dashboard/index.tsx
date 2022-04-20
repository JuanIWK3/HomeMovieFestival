import React, { SyntheticEvent, useEffect, useState } from "react";
import { Alert, Button, Dropdown, FormControl, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { RiSettings4Fill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import {
  validateFileSize,
  validateFileType,
} from "../../services/fileValidatorService";
import FileService from "../../services/fileService";
import { api } from "../../services/api";
import { MoviesList } from "../MoviesList";
import {
  Buttons,
  Container,
  Image,
  MoviesContainer,
  Preview,
  PreviewWrapper,
  Spinner,
} from "./styles";

interface ILista {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  magnet: string;
}

export default function Dashboard() {
  const [confirmed, setConfirmed] = useState(false);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [file, setFile] = useState<File>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadFormError, setUploadFormError] = useState<string>("");
  const [error, setError] = useState("");
  const { currentUser, logout, avatar, setAvatar, updatePic } = useAuth();
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

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShow = () => (
    setShow(true), setError(""), setUploadFormError("")
  );

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

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users/${userId}`, config);
      console.log("account deleted");
      navigate("/");
      handleLogOut();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteText = (e) => {
    if (e.value == currentUser.name) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
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
            `https://homemoviefestivalbucket.s3.us-east-2.amazonaws.com/${res.data.avatar}`
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
    <Container>
      <div className="header-container">
        <div className="user-tab">
          <div className="user-image-and-name">
            <Image src={`url(${avatar})`} onClick={handleShow} />
            <h3>{currentUser.name}</h3>
          </div>
          <Buttons>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <RiSettings4Fill />
                <p>Settings</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/update-profile");
                  }}
                >
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setShowDelete(true);
                  }}
                >
                  <p className="text-danger mb-0">Delete Account</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="secondary" onClick={handleLogOut}>
              <MdOutlineLogout />
              <p>Log Out</p>
            </Button>
          </Buttons>
        </div>
      </div>

      <MoviesContainer>
        <div className="movies-header">
          <h4>Movies</h4>
          <Link to="/newmovie">
            <Button variant="dark">Add a new movie</Button>
          </Link>
        </div>

        <MoviesList movies={moviesList} loading={false} userPage={true} />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change your profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreviewWrapper>
              {!loading ? (
                <Preview>
                  <p>Preview</p>
                  {previewURL === "" ? (
                    <div className="empty"></div>
                  ) : (
                    <img id="preview-image" src={previewURL} alt="" />
                  )}
                </Preview>
              ) : (
                <>
                  <p>Loading</p>
                  <Spinner />
                </>
              )}
            </PreviewWrapper>
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
              disabled={!file || uploadFormError !== ""}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete your account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please type <strong>{currentUser.name}</strong> to confirm
            </p>
            <FormControl
              style={{
                backgroundColor: "#333",
                color: "#fff",
                top: "70px",
                width: "100%",
              }}
              type="text"
              onChange={(e: SyntheticEvent) => {
                confirmDeleteText(e.currentTarget as HTMLInputElement);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            {error && (
              <Alert className="h-25" variant="danger">
                {error}
              </Alert>
            )}

            <Button
              onClick={handleDeleteAccount}
              disabled={!confirmed}
              type="submit"
              variant="danger"
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </MoviesContainer>
    </Container>
  );
}
