import React, { FormEvent, SyntheticEvent, useState } from "react";
import { Alert, Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import FileService from "../services/fileService";
import {
  validateFileSize,
  validateFileType,
} from "../services/fileValidatorService";

import "../style/newmovie.scss";

export default function Newmovie() {
  //* =========== Context ===========

  const { isLogged } = useAuth();

  //* =========== useState ===========

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [magnet, setMagnet] = useState("");
  const [image, setImage] = useState<File>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadFormError, setUploadFormError] = useState("");
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  //* =========== Functions ===========

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;
    console.log(file[0]);

    if (!file || file.length === 0) {
      setUploadFormError("");
      setImage(null);
      return;
    }

    console.log(file[0].name);

    const validFileSize = await validateFileSize(file[0].size);
    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0].name)
    );

    if (!validFileSize.isValid) {
      setUploadFormError(validFileSize.errorMessage);
      return;
    }
    if (!validFileType.isValid) {
      setUploadFormError(validFileType.errorMessage);
      return;
    }
    if (uploadFormError && validFileSize.isValid) {
      setUploadFormError("");
    }
    if (uploadFormError && validFileType.isValid) {
      setUploadFormError("");
    }

    setImage(file[0]);
    setValid(true);
  };

  async function sendData(event: FormEvent) {
    event.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("releaseDate", releaseDate);
    data.append("magnet", magnet);
    data.append("image", image);

    try {
      await api.post("movies/createmovie", data, config);
      setSuccess("Movie added");
      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  const curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substring(0, 10);

  return (
    <div
      className="newmovie-container center"
      style={{ maxWidth: "400px", width: "100vw", minWidth: "250px" }}
    >
      <div className="newmovie-page">
        <div className="content">
          <div>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                Add a New Movie
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                encType="multipart/form"
                onSubmit={sendData}
              >
                <FormControl
                  className="input"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  required
                  autoComplete="on"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormControl
                  className="input"
                  type="text"
                  name="description"
                  value={description}
                  required
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl
                  className="input"
                  type="date"
                  name="release"
                  value={releaseDate}
                  required
                  placeholder="Release Date"
                  onChange={(e) => setReleaseDate(e.target.value)}
                />

                <FormControl
                  className="input"
                  type="text"
                  name="magnet"
                  value={magnet}
                  required
                  placeholder="Magnet"
                  onChange={(e) => setMagnet(e.target.value)}
                />
                <FormControl
                  required
                  type="file"
                  onChange={(e: SyntheticEvent) =>
                    handleFileUpload(e.currentTarget as HTMLInputElement)
                  }
                />
                {uploadFormError && (
                  <text className="text-danger">{uploadFormError}</text>
                )}
                <p style={{ marginTop: "8px" }} className="text-warning">
                  Use images with 1:1 ratio
                </p>
                <div>
                  <Button
                    disabled={!valid}
                    style={{
                      border: "1px solid #00808053",
                      marginTop: "8px",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Card.Body>
          </div>
        </div>
      </div>
    </div>
  );
}
