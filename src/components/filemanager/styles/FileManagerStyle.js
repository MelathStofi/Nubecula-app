import styled from "styled-components";
import React from "react";

export const NubeculaFileManager = styled.div`
  color: #818181;
`;

export const Title = styled.h1`
  font-size: 3rem;
`;

export const SharedIcon = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export const Table = styled.table`
  border-spacing: 0;
  /*border: 1px solid #818181;*/
  table-layout: fixed;
  border-collapse: collapse;
  display: block;
  position: relative;
`;

export const THead = styled.thead`
  position: relative;
  width: 100%;
`;

export const Th = styled.td`
  width: 10%;
  max-width: 10%;
  padding-left: 5px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-weight: 600;
  text-align: left;

  border-bottom: 1px solid #818181;
  border-bottom: 1px solid #818181;
  &:hover {
    cursor: pointer;
    background-color: #e6fff9;
  }
`;

export const FilenameTh = styled(Th)`
  width: 36%;
  max-width: 30%;
`;

export const CreationDateTh = styled(Th)`
  width: 13%;
  max-width: 15%;
`;

export const TrHead = styled.tr``;

export const TBody = styled.tbody`
  position: absolute;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
`;

export const Tr = styled.tr`
padding-top: 10px
padding-bottom: 100px;
&:hover {
  cursor: default;
  background-color: #e6fff9;
}
`;

export const Td = styled.td`
  display: inline-block;
  width: 10%;
  max-width: 10%;
  padding-left: 5px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  &:hover {
    overflow: visible;
    position: relative;
    z-index: 2;
  }
`;

export const FilenameTd = styled(Td)`
  width: 30%;
  max-width: 30%;
`;

export const CreationDateTd = styled(Td)`
  width: 15%;
  max-width: 15%;
`;

export const OverflowText = styled.span`
  transition: background-color 1s;
  &:hover {
    background-color: #ffffcc;
    display: inline-block;
    height: 100%;
    box-shadow: 0.5px 0.5px;
  }
`;

const MaterialIcon = (props) => (
  <span class="material-icons">highlight_off</span>
);

export const XIcon = styled(MaterialIcon)`
  background-color: green;
  font-size: 50px;
`;
