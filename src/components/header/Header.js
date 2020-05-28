import React from "react";
import OptionesImage from "./resources/options.png";
import { NubeculaHeader, Link } from "../../styles/HeaderStyle";
import ShowWindowDimensions from "../WindowDimension";

const Header = (props) => {
  console.log(ShowWindowDimensions());

  return (
    <NubeculaHeader>
      <div>
        <button>
          <img width="10px" height="20px" src={OptionesImage} alt="Options" />
        </button>
      </div>

      <Link to="/">Nubecula</Link>

      <Link to="/sign-up">sign up</Link>
    </NubeculaHeader>
  );
};

export default Header;
