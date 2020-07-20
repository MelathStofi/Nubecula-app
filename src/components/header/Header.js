import React, { useEffect, useContext } from "react";
import TitleIMG from "../../resources/title.png";
import SignInIMG from "../../resources/sign_in.png";
import SignUpIMG from "../../resources/sign_up.png";
import LogoutIMG from "../../resources/log_out.png";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, Link } from "react-router-dom";
import { useLoading } from "../../contexts/Loading";
import { AppOptionsContext } from "../../contexts/AppOptionsContext";

import "./styles/HeaderStyle.css";

const Header = (props) => {
  const { loading, setLoading } = useLoading();
  const { user, setUser } = useContext(UserContext);
  const { showAppOptions, setShowAppOptions } = useContext(AppOptionsContext);
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

  if (loading) {
    return null;
  }
  return (
    <div className="header">
      <div className="public-link title-link">
        <Link to="/">
          <img width="120px" height="35px" src={TitleIMG} alt="Nubecula" />
        </Link>
      </div>
      {!user ? (
        <React.Fragment>
          <div className="public-link">
            <Link to={{ pathname: "/sign-in", prevPath: location.pathname }}>
              <img width="55px" height="29px" src={SignInIMG} alt="sign in" />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={{ pathname: "/sign-up", prevPath: location.pathname }}>
              <img width="62px" height="30px" src={SignUpIMG} alt="sign up" />
            </Link>
          </div>
        </React.Fragment>
      ) : (
        <div
          className="user-button"
          onClick={() => {
            setShowAppOptions(!showAppOptions);
          }}
        >
          <span className="user-button-text">{user}</span>
        </div>
      )}
    </div>
  );
};

export default Header;
