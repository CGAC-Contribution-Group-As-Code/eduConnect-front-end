import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { IoHelpCircleOutline, IoHandRightOutline } from "react-icons/io5";
import theme from "../../styles/theme";
export const ClassQA = () => {
  const [openQuestion, setOpenQuestion] = useState<boolean>(false);

  return (
    <div style={{ display: "flex", flexFlow: "column nowrap", gap: "10px" }}>
      <StyledRow onClick={() => setOpenQuestion(true)}>
        <IoHandRightOutline size={24} />
        <p>질문하기</p>
      </StyledRow>

      <Question />
    </div>
  );
};

// 질문 component

const Question = () => {
  return (
    <StyledQuestion>
      <StyledTextheader>
        <p>작성자</p>
        <p>2023.11.17</p>
      </StyledTextheader>
    </StyledQuestion>
  );
};

// 답변 component

const Answer = () => {};

const StyledQuestion = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 1em;
  border-radius: 15px;
  background-color: #f5f5f5;
`;

const StyledTextheader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  & > p:nth-child(1) {
    font-weight: 600;
    color: ${theme.navy};
  }
  & > p:nth-child(2) {
    font-size: 0.9em;
    color: gray;
  }
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 1px solid lightgray;
`;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  &:hover {
    color: ${theme.skyblue};
  }
  margin-bottom: 15px;
`;

const StyledCon = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;
