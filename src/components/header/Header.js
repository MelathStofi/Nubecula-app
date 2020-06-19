import React, { useContext } from "react";
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
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const Header = (props) => {
  console.log(ShowWindowDimensions());
  const { username, setUsername, setRoles } = useContext(UserContext);

  const signOut = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SIGN_OUT_URL,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setUsername(null);
        setRoles(null);
      }
    });
    console.log("username: ", username);
  };

  return (
    <NubeculaHeader>
      <TextContainer>
        <Link to="/">
          <img width="160px" height="50px" src={TitleIMG} alt="Title" />
        </Link>
        {!username ? (
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
