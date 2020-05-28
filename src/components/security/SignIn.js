import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const signInUrl = process.env.REACT_APP_SIGN_IN_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [incorrectUsername, setIncorrectUsername] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [fatalError, setFatalError] = useState("");

  const register = () => {
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
          //console.clear();
          setFatalError("Something went wrong, try again later!");
        })
        .then((resp) => {
          if (resp) console.log(resp.data);
        });
    }
  };

  const inputCheck = () => {
    let result = true;
    setIncorrectUsername("");
    setIncorrectPassword("");
    if (username === "") {
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
          onChange={(e) => setUsername(e.target.value)}
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
