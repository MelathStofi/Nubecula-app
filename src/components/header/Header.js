import React, { useState, useEffect } from "react";
import {
  NubeculaHeader,
  Link,
  TextContainer,
  SignIn,
  SignUpAndOut,
} from "./styles/HeaderStyle";
import ShowWindowDimensions from "../WindowDimension";

//import OptionsImage from "./resources/options.png";
import TitleIMG from "./resources/title.png";
import SignInIMG from "./resources/sign_in.png";
import SignUpIMG from "./resources/sign_up.png";
import LogoutIMG from "./resources/log_out.png";
import axios from "axios";

const Header = (props) => {
  console.log(ShowWindowDimensions());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        setLoading(false);
      })
      .then((resp) => {
        setLoading(false);
        if (resp) {
          setUser(resp.data);
        }
      });
  }, [setUser, setLoading]);

  const signOut = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SIGN_OUT_URL,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setUser(null);
      }
    });
    console.log("username: ", user);
  };

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <NubeculaHeader>
      <TextContainer>
        <Link to="/">
          <img width="160px" height="50px" src={TitleIMG} alt="Title" />
        </Link>
        {!user ? (
          <React.Fragment>
            <SignIn to="/sign-in">
              <img width="60px" height="30px" src={SignInIMG} alt="Title" />
            </SignIn>
            <SignUpAndOut to="/sign-up">
              <img width="67px" height="30px" src={SignUpIMG} alt="Title" />
            </SignUpAndOut>
          </React.Fragment>
        ) : (
          <SignUpAndOut to="/" onClick={() => signOut()}>
            <img width="60px" height="30px" src={LogoutIMG} alt="Title" />
          </SignUpAndOut>
        )}
      </TextContainer>
    </NubeculaHeader>
  );
};

export default Header;
