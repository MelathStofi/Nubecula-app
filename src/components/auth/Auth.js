import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

import "./styles/AuthStyle.css";
import { useHistory, useLocation, Link } from "react-router-dom";

import TitleImg from "../../resources/title.png";

const Auth = (props) => {
  const location = useLocation();
  const isSignUp = location.pathname === "/sign-up" ? true : false;
  const signUpUrl = process.env.REACT_APP_SIGN_UP_URL;
  const signInUrl = process.env.REACT_APP_SIGN_IN_URL;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { setUser, setRoles } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");

  const submit = () => {
    if (isSignUp) {
      if (inputCheck()) {
        const signUpBody = {
          username: username,
          email: email,
          password: password,
        };

        axios({
          method: "post",
          url: signUpUrl,
          data: signUpBody,
          withCredentials: true,
        })
          .catch((error) => {
            if (error.response.data === "EMAIL")
              setErrorMessage("Email is already in use!");
            else if (error.response.data === "USERNAME")
              setErrorMessage("Username is already in use!");
            else setErrorMessage("Something went wrong, try again later!");
          })
          .then((resp) => {
            if (resp) history.push("/sign-in");
          });
      }
    } else {
      if (inputCheck()) {
        const signInBody = {
          username: username,
          password: password,
        };

        axios({
          method: "post",
          url: signInUrl,
          data: signInBody,
          withCredentials: true,
        })
          .catch((error) => {
            setErrorMessage("Incorrect username or password!");
          })
          .then((resp) => {
            if (resp) {
              setUser(resp.data.username);
              setRoles(resp.data.roles);
              if (props.location.prevPath !== undefined)
                history.push(props.location.prevPath);
              else history.push("/file-manager");
            }
          });
      }
    }
  };

  const inputCheck = () => {
    let result = true;
    setErrorMessage("");
    if (username === "") {
      setErrorMessage("Username field must be filled!");
      result = false;
    }
    if (isSignUp && email === "") {
      setErrorMessage("E-mail field must be filled!");
      result = false;
    }
    if (isSignUp) {
      if (password === "" || password !== confirmedPassword) {
        setErrorMessage("Passwords do not match!");
        result = false;
      }
    } else if (password === "") {
      setErrorMessage("Password field must be filled!");
      result = false;
    }
    return result;
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <img
          className="title-img"
          width="877px"
          height="257px"
          src={TitleImg}
          alt="Nubecula"
        />
      </div>
      <div className="auth-container">
        <div className="back-link-container">
          <Link
            className="back-link"
            to={
              props.location.prevPath
                ? props.location.prevPath
                : "/file-manager"
            }
          >
            GO BACK
          </Link>
        </div>
        <div className="input-container">
          <input
            className="auth-input"
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {isSignUp ? (
          <div className="input-container">
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="user@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : null}
        <div className="input-container">
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (!isSignUp && e.keyCode === 13) submit();
            }}
          />
        </div>
        {isSignUp ? (
          <div className="input-container">
            <input
              className="auth-input"
              type="password"
              name="confirm-password"
              placeholder="confirm password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.keyCode === 13) submit();
              }}
            />
          </div>
        ) : null}
        <div className="input-container">
          <input
            className="submit-button auth-input"
            onClick={() => submit()}
            value={isSignUp ? "Ready!" : "Sign in!"}
            readOnly={true}
            onKeyUp={(e) => {
              if (e.keyCode === 13) submit();
            }}
          ></input>
        </div>
        <div className="error-message">{errorMessage}</div>
      </div>
    </div>
  );
};

export default Auth;
