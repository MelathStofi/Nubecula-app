import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function MainPage() {
  const { username } = useContext(UserContext);

  return (
    <div>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;Greetings {username}!</h1>
    </div>
  );
}
