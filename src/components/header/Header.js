import React from "react";
import {
  NubeculaHeader,
  Link,
  TextContainer,
  TitleImage,
} from "./styles/HeaderStyle";
import ShowWindowDimensions from "../WindowDimension";

import OptionsImage from "./resources/options.png";
import Title from "./resources/title.png";

const Header = (props) => {
  console.log(ShowWindowDimensions());

  return (
    <NubeculaHeader>
      <TextContainer>
        <Link to="/">
          <TitleImage>
            <img width="15%" height="100%" src={Title} alt="Title" />
          </TitleImage>
        </Link>
        <div>
          <Link to="/sign-in">log in</Link>
          <Link to="/sign-up">sign up</Link>

          <button>
            <img width="10px" height="20px" src={OptionsImage} alt="Options" />
          </button>
        </div>
      </TextContainer>
    </NubeculaHeader>
  );
};

export default Header;
