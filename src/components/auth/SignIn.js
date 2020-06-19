import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const SignUp = () => {
  const signInUrl = process.env.REACT_APP_SIGN_IN_URL;
  const history = useHistory();
  const { setUsername, setRoles } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const [incorrectUsername, setIncorrectUsername] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [fatalError, setFatalError] = useState("");

  const register = () => {
    if (inputCheck()) {
      const signInBody = {
        username: usernameInput,
        password: password,
      };

      axios({
        method: "post",
        url: signInUrl,
        data: signInBody,
        withCredentials: true,
      })
        .catch((error) => {
          //console.clear();
          setFatalError("Incorrect username or password!");
        })
        .then((resp) => {
          if (resp) {
            setUsername(resp.data.username);
            setRoles(resp.data.roles);
            history.push("/drive");
          }
        });
    }
  };

  const inputCheck = () => {
    let result = true;
    setIncorrectUsername("");
    setIncorrectPassword("");
    if (usernameInput === "") {
      setIncorrectUsername("Must be filled!");
      result = false;
    }
    if (password === "") {
      setIncorrectPassword("Must be filled!");
      result = false;
    }
    return result;
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        {incorrectUsername}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {incorrectPassword}
      </div>
      <div>
        <button onClick={() => register()}>Sign in!</button>
        {fatalError}
      </div>
    </div>
  );
};

export default SignUp;
