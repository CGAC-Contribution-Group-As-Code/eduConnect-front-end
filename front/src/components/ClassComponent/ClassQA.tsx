import React, { useState, useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { IoHelpCircleOutline, IoHandRightOutline } from "react-icons/io5";
import theme from "../../styles/theme";
import { AiOutlineRobot } from "react-icons/ai";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { IoCloseCircleOutline, IoSchoolSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { TbMessageCircleQuestion } from "react-icons/tb";

export const ClassQA = () => {
  const [openQuestion, setOpenQuestion] = useState<boolean>(false);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        gap: "10px",
      }}
    >
      {openQuestion === false ? (
        <StyledRow onClick={() => setOpenQuestion(true)}>
          <IoHandRightOutline size={24} />
          <p>질문하기</p>
        </StyledRow>
      ) : (
        <StyledRow onClick={() => setOpenQuestion(false)}>
          <IoCloseCircleOutline color="red" size={24} />
          <p>닫기</p>
        </StyledRow>
      )}

      {openQuestion ? <MakeQuestion /> : <></>}

      <StyledCon>
        <Question />
        <Question />
      </StyledCon>
    </div>
  );
};

const MakeQuestion = () => {
  const content = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "9fr 1fr",
        columnGap: "1vw",
        justifyItems: "center",
        alignItems: "center",
        marginBottom: "2em",
      }}
    >
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={3}
        color="primary"
        label="질문 내용 입력"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={content}
      />
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "7px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <TbMessageCircleQuestion color={theme.navy} size={25} />
        <StyledP>질문 등록</StyledP>
      </div>
    </div>
  );
};

// 질문 component

const Question = () => {
  const [openAnswer, setOpenAnswer] = useState<boolean>(false);
  const [makeAnswer, setMakeAnswer] = useState<boolean>(false);

  return (
    <StyledQuestion>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOpenAnswer(!openAnswer)}
        title="클릭해 답변 보기"
      >
        <StyledTextheader>
          <p>작성자</p>
          <p>2023.11.17</p>
        </StyledTextheader>

        <p
          style={{
            whiteSpace: "pre-wrap",
            padding: " 5px 10px",
            minHeight: "70px",
          }}
        >
          {" "}
          질문 내용
        </p>
      </div>

      {openAnswer ? (
        <div
          style={{ display: "flex", flexFlow: "column nowrap", gap: "10px" }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `1px solid ${theme.skyblue}`,
              padding: "0.5em",
            }}
          >
            <StyledRow2 onClick={() => setMakeAnswer(!makeAnswer)}>
              <MdOutlineQuestionAnswer size={23} />
              <p>답변 작성</p>
            </StyledRow2>

            <StyledRow2>
              <AiOutlineRobot size={23} />
              <p>AI에게 질문하기</p>
            </StyledRow2>
          </div>

          {makeAnswer ? <MakeAnswer /> : <></>}

          <Answer />
          <Answer />
        </div>
      ) : (
        <></>
      )}
    </StyledQuestion>
  );
};

const MakeAnswer = () => {
  const content = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "9fr 1fr",
        columnGap: "1vw",
        justifyItems: "center",
        alignItems: "center",
        marginBottom: "1em",
      }}
    >
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={3}
        color="primary"
        label="답변 내용 입력"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={content}
      />
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "7px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <IoSchoolSharp color={theme.navy} size={25} />
        <StyledP>답변 등록</StyledP>
      </div>
    </div>
  );
};

// 답변 component

const Answer = () => {
  return (
    <StyledAnswer>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",

          justifyContent: "space-between",
          alignItems: "center",

          padding: "0.5em",
          borderBottom: "1px solid skyblue",
          margin: "0 10px",
        }}
      >
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>작성자 ID</p>
        <p style={{ color: "gray", fontSize: "0.9em" }}>2023.11.17</p>
      </div>
      <p style={{ whiteSpace: "pre-wrap", padding: "0.5em 1.5em" }}>
        답변 내용
      </p>
    </StyledAnswer>
  );
};

const StyledAnswer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 0.5em;
  border-radius: 15px;
  background-color: aliceblue;
`;

const StyledQuestion = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 1em;
  border-radius: 15px;
  border: 1px solid ${theme.navy};
  gap: 10px;
  margin-bottom: 10px;
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
  border-bottom: 1px solid ${theme.skyblue};
`;

const StyledRow2 = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  &:hover {
    color: ${theme.navy};
    font-weight: 600;
  }
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

const StyledP = styled.p`
  font-weight: 600;
  font-size: 1.1em;
  &:hover {
    color: ${theme.navy};
  }
`;
