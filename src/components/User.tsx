import { api } from "../services/api";
import React, { SyntheticEvent, useState } from "react";

function User() {
  const [pictureUrl, setPictureUrl] = useState(
    "https://global-uploads.webflow.com/5e4627609401e01182af1cce/5eb13bfdb4659efea4f8dace_profile-dummy.png"
  );

  function forgotMessage() {
    alert("You are an idiot");
  }

  const user = {
    username: "juaniwk3",
    email: "juaniwk3@email.com",
    pictureUrl:
      "https://www.themebeta.com/files/picture/201601/18/78ae73519371a3c6ccffd86d5f33e60f.jpeg",
  };

  const styles = {
    section: {
      border: "1px solid grey",
      margin: "16px",
      borderRadius: "0.4rem",
    },
  };
  return (
    <div className="user-page">
      <div style={styles.section} className="section user-data">
        <div className="title">
          <p
            style={{ borderBottom: "1px solid grey", marginBottom: "32px" }}
            className="title"
          >
            User Data
          </p>
          <p className="subtitle">
            <strong>Username:</strong> {user.username}{" "}
          </p>
          <p className="subtitle">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="subtitle">
            <strong>Password: </strong>
            <u onClick={forgotMessage} style={{ cursor: "pointer" }}>
              Forgot Password?
            </u>{" "}
          </p>
          <div className="container-picture">
            <div style={{ display: "flex" }} className="container">
              <p className="subtitle">
                <strong>Profile Picture:</strong>
              </p>
              <input
                style={{ width: "50%", marginLeft: "16px" }}
                placeholder="Url"
                value={pictureUrl}
                className="input"
                type="text"
                onChange={(e) => setPictureUrl(e.target.value)}
              />
            </div>
            <div
              style={{ backgroundImage: `url(${pictureUrl}` }}
              className="picture"
            ></div>
          </div>
        </div>
      </div>
      <div style={styles.section} className="section user-movies">
        <div className="title">User Movies</div>
      </div>
    </div>
  );
}
export { User };
2;
