import React, { useState } from "react";
import styled from "styled-components";
import StyledDiv from "../styles/StyledDiv";
import StyledWrapper from "../styles/StyledWrapper";
import theme from "../styles/theme";
import { ClassHome } from "../components/ClassHome";
import { ClassGuide } from "../components/ClassGuide";
import { ClassQA } from "../components/ClassQA";
import { ClassQuiz } from "../components/ClassQuiz";
import { ClassStdMng } from "../components/ClassStdMng";

export const Room = () => {
  const path = decodeURI(window.location.pathname).split("/");
  const now = path.at(-1);

  const [page, setPage] = useState<Number>(0);

  const SwitchPage = (e: Number) => {
    switch (e) {
      case 0: // HOME
        return <ClassHome />;
      case 1: // 이정표
        return <ClassGuide />;
      case 2: // 퀴즈
        return <ClassQuiz />;
      case 3: // Q&A
        return <ClassQA />;
      case 4: // 학습자 관리
        return <ClassStdMng />;
    }
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledGrid>
          <StyledMenu>
            <p
              style={{
                fontSize: "1.1em",
                color: `${theme.navy}`,
                fontWeight: "600",
              }}
            >
              MENU
            </p>
            <Styledp onClick={() => setPage(0)}>HOME</Styledp>
            <Styledp onClick={() => setPage(1)}>이정표</Styledp>
            <Styledp onClick={() => setPage(2)}>Quiz</Styledp>
            <Styledp onClick={() => setPage(3)}>Q&A</Styledp>
            <Styledp onClick={() => setPage(4)}>학습자 관리</Styledp>
          </StyledMenu>
          <StyledContent>
            <p
              style={{ fontWeight: "600", textAlign: "end", fontSize: "1.2em" }}
            >
              강의실 이름
            </p>

            {SwitchPage(page)}
          </StyledContent>
        </StyledGrid>
      </StyledDiv>
    </StyledWrapper>
  );
};

const Styledp = styled.p`
  &:hover {
    background: ${theme.skyblue};
    color: white;
    transition: 0.5s;
    padding-left: 10px;
    cursor: pointer;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  border-right: 1px solid ${theme.skyblue};
  height: 100%;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 8.5fr;
  column-gap: 2vw;
  height: 100%;
`;
