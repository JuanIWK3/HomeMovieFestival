import React, { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { baseURL } from "./../services/api";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext<any>(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [isLogged, setIsLogged] = useState<boolean>();
  const [token, setToken] = useState("");
  const getUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorage.getItem("auth") == "true") {
      setCurrentUser(getUser);
      setIsLogged(true);
      setAvatar(localStorage.getItem("avatar"));
    }
  }, []);

  const signUp = (username: string, email: string, password: string) => {
    return api.post("users", {
      name: username,
      email: email,
      password: password,
    });
  };

  const login = (email: string, password: string) => {
    return api
      .post("/sessions", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem(
          "avatar",
          `${baseURL}/files/${res.data.user.avatar}`
        );
        setToken(localStorage.getItem("token"));
        setIsLogged(true);
        setAvatar(localStorage.getItem("avatar"));
        setCurrentUser(res.data.user);

        api.defaults.headers.common = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      });
  };

  const updatePic = (file: FormData) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    return api.patch("/users/avatar", file, config);
  };

  const logout = () => {
    return (
      localStorage.removeItem("token"),
      localStorage.removeItem("avatar"),
      localStorage.removeItem("user"),
      localStorage.setItem("auth", "false"),
      setCurrentUser({}),
      setIsLogged(false)
    );
  };

  const value = {
    isLogged,
    signUp,
    login,
    logout,
    currentUser,
    avatar,
    updatePic,
    setAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
