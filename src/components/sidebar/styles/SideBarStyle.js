import styled from "styled-components";

import { Link as RLink } from "react-router-dom";

export const NubeculaSideBar = styled.div`
  margin: 0;
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 13%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 4rem; /* Stay at the top */
  left: 0;
  background-color: white;
  box-shadow: 0 0 3px 0px #cccccc;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  padding-left: 20px;
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

export const Link = styled(RLink)`
  padding: 5% 8px 0px 8%;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  &:hover {
    color: #b0aeae;
  }
`;
