import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const signUpUrl = process.env.REACT_APP_SIGN_UP_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [incorrectUsername, setIncorrectUsername] = useState("");
  const [incorrectEmail, setIncorrectEmail] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [fatalError, setFatalError] = useState("");

  const register = () => {
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
      }).catch((error) => {
        //console.clear();
        if (error.response.data === "EMAIL")
          setIncorrectEmail("Email is already in use!");
        else if (error.response.data === "USERNAME")
          setIncorrectUsername("Username is already in use!");
        else setFatalError("Something went wrong, try again later!");
      });
      // .then((resp) => {
      //   if (resp) console.log(resp.data);
      // });
    }
  };

  const inputCheck = () => {
    let result = true;
    setIncorrectUsername("");
    setIncorrectEmail("");
    setIncorrectPassword("");
    if (username === "") {
      setIncorrectUsername("Must be filled!");
      result = false;
    }
    if (email === "") {
      setIncorrectEmail("Must be filled!");
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
          type="email"
          name="email"
          placeholder="user@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        {incorrectEmail}
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
        <button onClick={() => register()}>Ready!</button>
        {fatalError}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      Hello
    </div>
  );
}
