import React, { useEffect, useContext } from "react";
import {
  NubeculaHeader,
  TitleLink,
  TextContainer,
  SignIn,
  SignUpAndOut,
} from "./styles/HeaderStyle";

//import OptionsImage from "./resources/options.png";
import TitleIMG from "../../resources/title.png";
import SignInIMG from "../../resources/sign_in.png";
import SignUpIMG from "../../resources/sign_up.png";
import LogoutIMG from "../../resources/log_out.png";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../contexts/Loading";

const Header = (props) => {
  const { loading, setLoading } = useLoading();
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

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
        window.location.reload();
      }
    });
  };

  if (loading) {
    return null;
  }
  return (
    <NubeculaHeader>
      <TextContainer>
        <TitleLink to="/">
          <img width="120px" height="35px" src={TitleIMG} alt="Nubecula" />
        </TitleLink>
        {!user ? (
          <React.Fragment>
            <SignIn to={{ pathname: "/sign-in", prevPath: location.pathname }}>
              <img width="55px" height="29px" src={SignInIMG} alt="sign in" />
            </SignIn>
            <SignUpAndOut
              to={{ pathname: "/sign-up", prevPath: location.pathname }}
            >
              <img width="62px" height="30px" src={SignUpIMG} alt="sign up" />
            </SignUpAndOut>
          </React.Fragment>
        ) : (
          <SignUpAndOut to="/file-manager" onClick={() => signOut()}>
            <img width="60px" height="30px" src={LogoutIMG} alt="log out" />
          </SignUpAndOut>
        )}
      </TextContainer>
    </NubeculaHeader>
  );
};

export default Header;
