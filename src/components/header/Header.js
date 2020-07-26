import React, { useEffect, useContext } from "react";
import TitleIMG from "../../resources/title.png";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useLoading } from "../../contexts/Loading";
import { AppOptionsContext } from "../../contexts/AppOptionsContext";
import MenuIMG from "../../resources/menu.png";

import "./styles/HeaderStyle.css";

const Header = (props) => {
  const { loading, setLoading } = useLoading();
  const { user, setUser } = useContext(UserContext);
  const { showAppOptions, setShowAppOptions } = useContext(AppOptionsContext);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_CURRENT_USER_URL,
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
      <div className="title-link">
        <Link to="/">
          <img width="120px" height="35px" src={TitleIMG} alt="Nubecula" />
        </Link>
      </div>
      {!user ? (
        <React.Fragment>
          <div
            className="public-link"
            onClick={() => {
              setShowAppOptions(!showAppOptions);
            }}
          >
            <img width="30px" height="32px" src={MenuIMG} alt="menu" />
          </div>
        </React.Fragment>
      ) : (
        <div
          className="user-button"
          onClick={() => {
            setShowAppOptions(!showAppOptions);
          }}
        >
          <span className="user-button-text">{user.username}</span>
        </div>
      )}
    </div>
  );
};

export default Header;
