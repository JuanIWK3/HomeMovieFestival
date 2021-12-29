import { FormEvent, SyntheticEvent, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { input } from "../style/global";

export default function Newmovie() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [magnet, setMagnet] = useState("");
  const [image, setImage] = useState<File>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isLogged } = useAuth();

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;
    console.log(file[0]);

    if (!file || file.length === 0) {
      return;
    }
    setImage(file[0]);
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
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <div style={{ maxWidth: "400px", width: "40vw" }}>
      {!isLogged ? (
        <Alert
          className="d-flex align-items-center justify-content-center flex-column "
          variant="danger"
        >
          <p>You must be logged to add a movie</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Alert>
      ) : (
        <div className="newmovie-page">
          <div className="content">
            <Card>
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
                  <input
                    style={input}
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    required
                    autoComplete="on"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    style={input}
                    type="text"
                    name="description"
                    value={description}
                    required
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    style={input}
                    type="date"
                    name="release"
                    value={releaseDate}
                    required
                    placeholder="Release Date"
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                  <input
                    style={input}
                    type="text"
                    name="magnet"
                    value={magnet}
                    required
                    placeholder="Magnet"
                    onChange={(e) => setMagnet(e.target.value)}
                  />
                  <input
                    style={input}
                    required
                    type="file"
                    onChange={(e: SyntheticEvent) =>
                      handleFileUpload(e.currentTarget as HTMLInputElement)
                    }
                  />
                  <div>
                    <Button
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
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
