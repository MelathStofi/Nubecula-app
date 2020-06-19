import styled from "styled-components";

import { Link as RLink } from "react-router-dom";

export const NubeculaHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 7rem;
  line-height: 500%;
  z-index: 1; /* Stay on top */
  top: 0;
  background-color: #9acbcb;
  background-image: linear-gradient(#7db49c, #9dc8b5, #90c5ae);
  box-shadow: 0 0 10px 5px #888888;
`;

export const Link = styled(RLink)`
  &:hover {
    font-size: 105%;
  }
`;

export const TextContainer = styled.div`
  margin: 25px 50px;
  position: relative;
  display: flex;
  flex: none;
`;

export const SignIn = styled(Link)`
  position: absolute;
  right: 90px;
`;

export const SignUpAndOut = styled(Link)`
  position: absolute;
  right: 0;
`;
