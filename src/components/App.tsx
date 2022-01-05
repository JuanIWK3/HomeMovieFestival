// React
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

// Components
import Signup from "./Signup";
import Login from "./Login";
import Nav from "./Navbar";
import Dashboard from "./Dashboard";
import Movies from "./Movies";
import Newmovie from "./NewMovie";
import { PrivateRoute } from "./PrivateRoute";

// Bootstrap
import { Container } from "react-bootstrap";
import NotFound from "./NotFound";
import { UpdateProfile } from "./UpdateProfile";
import { Footer } from "./Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex align-items-center flex-column justify-content-between h-100">
          <Nav />
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{
              marginTop: "50px",
            }}
          >
            <div className="w-100 d-flex align-items-center justify-content-center">
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route
                  path="/newmovie"
                  element={<PrivateRoute element={Newmovie} />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute element={Dashboard} />}
                />
                <Route
                  path="/update-profile"
                  element={<PrivateRoute element={UpdateProfile} />}
                />

                <Route path="*" element={<Movies />} />
                <Route path="/notfound" element={<NotFound />} />
              </Routes>
            </div>
          </Container>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
