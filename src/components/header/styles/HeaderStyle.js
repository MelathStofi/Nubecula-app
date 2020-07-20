import styled from "styled-components";

import { Link as RLink } from "react-router-dom";

export const NubeculaHeader = styled.header`
  position: fixed;
  width: 100vw;
  height: 4rem;
  line-height: 500%;
  z-index: 2; /* Stay on top */
  top: 0;
  background-color: #9acbcb;
  background-image: linear-gradient(#7db49c, #9dc8b5, #90c5ae);
  box-shadow: 0 0 10px 5px #888888;
`;

export const TitleLink = styled(RLink)`
  &:hover {
    top: 2px;
  }
`;

export const TextContainer = styled.div`
  height: 4rem;
  margin: 0 3%;
  position: relative;
  display: flex;
  flex: none;
`;

export const SignIn = styled(TitleLink)`
  margin-top: 4px;
  position: absolute;
  right: 90px;
`;

export const SignUpAndOut = styled(TitleLink)`
  margin-top: 4px;
  position: absolute;
  right: 0;
`;
