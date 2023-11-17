import React, { FC } from "react";
import styled from "styled-components";
import StyledDiv from "../styles/StyledDiv";
import StyledWrapper from "../styles/StyledWrapper";
import { Classroom } from "../components/Classroom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

interface RootState {
  user: {
    id: string;
    role: number;
  };
}

export const Home = () => {
  const navigate = useNavigate();
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  console.log(id, role);

  return (
    <StyledWrapper>
      <StyledDiv>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Styledh2>내가 속한 강의실</Styledh2>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              gap: "5px",
              alignItems: "center",
              cursor: "pointer",
            }}
            id="makeClass"
            onClick={() => navigate("/make")}
          >
            <StyledText>강의 개설하기</StyledText>
            <AiOutlinePlusCircle size={25} color={theme.skyblue} />
          </div>
        </div>

        <hr />
        <StyledBox>
          <Classroom />
        </StyledBox>
        <div style={{ width: "50%", position: "relative", marginTop: "20px" }}>
          <StyledText>시스템 공지사항</StyledText>
          <hr />
          <ul style={{ position: "relative", left: "30px" }}>
            <Styledli>저작권 유의사항 안내</Styledli>
            <Styledli>개발 시작</Styledli>
          </ul>
        </div>
      </StyledDiv>
    </StyledWrapper>
  );
};

const StyledBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 2em 0;
`;

const Styledh2 = styled.h2`
  font-size: 1.2em;
  font-weight: 600;
  font-family: "HealthsetGothicLight";
  margin: 0 !important;
`;

const StyledText = styled.p`
  font-size: 1em;
  font-weight: 600;
`;

const Styledli = styled.li`
  font-family: "HealthsetGothicLight";
  font-weight: 500;
  font-size: 1em;
  margin-bottom: 10px;
  list-style-type: disc;
`;
