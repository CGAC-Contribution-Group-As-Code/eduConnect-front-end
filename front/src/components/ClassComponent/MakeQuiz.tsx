import React, { useRef } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Swal from "sweetalert2";
import axios from "axios";
import TextField from "@mui/material/TextField";

export const MakeQuiz = () => {
  return (
    <StyledDiv>
      <StyledGrid>
        <Obj />
        <Sub />
      </StyledGrid>
    </StyledDiv>
  );
};

const Obj = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);

  return (
    <StyledObj>
      <p style={{ fontWeight: "600", textAlign: "center" }}>객관식 문제 생성</p>

      <TextField
        id="outlined-multiline-static"
        color="primary"
        variant="standard"
        label="문제 제목 입력"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={title}
      />

      <TextField
        id="outlined-multiline-static"
        color="primary"
        multiline
        rows={3}
        label="문제 설명 입력"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={content}
      />
    </StyledObj>
  );
};

const Sub = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);

  return (
    <StyledSub>
      <p style={{ fontWeight: "600", textAlign: "center" }}>주관식 문제 생성</p>

      <TextField
        id="outlined-multiline-static"
        color="primary"
        variant="standard"
        label="문제 제목 입력"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={title}
      />

      <TextField
        id="outlined-multiline-static"
        color="primary"
        multiline
        rows={3}
        label="문제 설명 입력"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={content}
      />
    </StyledSub>
  );
};

const StyledSub = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  height: 100%;
  width: 100%;
  padding: 0 1.5em;
`;

const StyledObj = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  border-right: 2px solid lightgray;
  height: 100%;
  width: 100%;
  padding: 0 1.5em;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`;
