import React, {
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  validateFileSize,
  validateFileType,
} from "../services/fileValidatorService";
import FileService from "../services/fileService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { baseURL } from "./../services/api";

export const UpdateProfile = () => {
  //* =========== User===========

  const { currentUser, logout, avatar, setAvatar, updatePic, isLogged } =
    useAuth();
  const userId = JSON.parse(localStorage.getItem("user")).id;

  //* =========== useState ===========

  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadFormError, setUploadFormError] = useState<string>("");
  const [error, setError] = useState("");

  //* =========== useRef ===========

  const usernameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const oldPasswordRef = useRef<any>(null);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const navigate = useNavigate();

  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [localStorage.getItem("avatar")]);

  //* =========== Functions ===========

  const { handleLogOut } = useAuth();

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

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      oldPassword: oldPasswordRef.current.value,
    };

    try {
      await api.put(`/users/${userId}`, data, config);
    } catch (err) {
      console.log(err);
    }

    return;
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
          console.log(res);

          localStorage.setItem("avatar", `${baseURL}/files/${res.data.avatar}`);
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);

    setTimeout(() => {
      setAvatar(localStorage.getItem("avatar"));
    }, 1000);

    console.log(avatar);

    handleClose();
    handleShow();

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 1000);
  };

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

  const handleClose = () => {
    setShow(false);
    setFile(null);
    setPreviewURL("");
  };
  const handleShow = () => (setShow(true), setError(""));

  //* =========== Style ===========

  const style = {
    button: {
      width: "100%",
      marginTop: "8px",
    },
    input: {
      width: "100%",
    },
  };

  return (
    <div
      className="center"
      style={{
        maxWidth: "400px",
        width: "100vw",
        minWidth: "250px",
      }}
    >
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <div
              id="preview-box"
              style={{
                backgroundImage: `url(${avatar})`,
              }}
              onClick={handleShow}
            ></div>
          </div>
          <Form onSubmit={handleUpdateProfile} style={style.input}>
            <FormGroup style={{ marginBottom: "4px" }}>
              <FormLabel>New Username</FormLabel>
              <FormControl ref={usernameRef} type="text" />
            </FormGroup>
            <FormGroup style={{ marginBottom: "4px" }}>
              <FormLabel>New Email</FormLabel>
              <FormControl ref={emailRef} type="email" />
            </FormGroup>
            <FormGroup style={{ marginBottom: "4px" }}>
              <FormLabel>New Password</FormLabel>
              <FormControl ref={passwordRef} type="password" />
            </FormGroup>
            <FormGroup style={{ marginBottom: "4px" }}>
              <FormLabel>Current Password</FormLabel>
              <FormControl ref={oldPasswordRef} required type="password" />
            </FormGroup>
            {error && (
              <Alert
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  paddingTop: "30px",
                }}
                variant="danger"
              >
                <p>{error}</p>
              </Alert>
            )}
            <Button disabled={true} style={style.button} type="submit">
              Save Changes
            </Button>
            <Button
              className="bottom"
              variant="danger"
              style={style.button}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Form>
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
  );
};
