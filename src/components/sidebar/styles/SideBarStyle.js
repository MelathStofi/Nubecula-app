import styled from "styled-components";

import { Link as RLink } from "react-router-dom";

export const NubeculaSideBar = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 15%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 1; /* Stay at the top */
  left: 0;
  background-color: #eff6f3;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
`;

export const Link = styled(RLink)`
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  &:hover {
    color: #f1f1f1;
  }
`;
