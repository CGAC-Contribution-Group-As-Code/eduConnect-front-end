import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Classroom = () => {
  const navigate = useNavigate();

  return (
    <StyledBox>
      <p style={{ fontWeight: "600", fontSize: "1.1em" }}>강의실 이름</p>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
        }}
      >
        <p>교육자 : id님</p>
        <p>현재 인원 : 5명</p>
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: #f3f3f3;
  border-radius: 15px;
  padding: 1em 1vw;
  min-width: 330px;
  background-image: url("/image/logo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%;
  min-height: 140px;
  cursor: pointer;
`;
