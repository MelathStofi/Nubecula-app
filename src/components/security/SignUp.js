import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUpUrl = process.env.REACT_APP_SIGN_UP_URL;

  const register = () => {
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
    }).then((resp) => {
      if (resp.status === 200) {
        console.log("ok");
      } else {
        console.log("nem ok");
      }
    });
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
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="user@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => register()}>Ready!</button>
      </div>
    </div>
  );
}
