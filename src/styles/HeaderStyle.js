import styled from "styled-components";

import { Link as RLink } from "react-router-dom";

export const NubeculaHeader = styled.header`
  padding: 1rem 0.5rem;
  background-color: #9acbcb;
  background-image: linear-gradient(#7db49c, #9dc8b5, #90c5ae);
  box-shadow: 0 0 10px 5px #888888;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const Title = styled(RLink)`
  text-decoration: none;
  font-size: 200%;
`;

export const Link = styled(RLink)`
  text-decoration: none;
  color: white;
  &:hover {
    text-shadow: 0 0 10px 5px #888888;
  }
`;
