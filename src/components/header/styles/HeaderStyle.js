import styled from "styled-components";

import { Link as RLink } from "react-router-dom";

export const NubeculaHeader = styled.header`
  z-index: 0; /* Stay on top */
  top: 0; /* Stay at the top */
  padding: 1rem 0.5rem;
  background-color: #9acbcb;
  background-image: linear-gradient(#7db49c, #9dc8b5, #90c5ae);
  box-shadow: 0 0 10px 5px #888888;
`;

export const Link = styled(RLink)`
  text-decoration: none;
  color: white;
  &:hover {
    font-size: 105%;
    text-shadow: 1px 1px #888888;
  }
`;

export const TextContainer = styled.div`
  margin: 0 1%;
  display: flex;
  flex: none;
  justify-content: space-between;
`;

export const TitleImage = styled.div``;
