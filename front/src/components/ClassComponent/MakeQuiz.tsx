import React, { useRef, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineRobot } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import { IoCheckboxOutline } from "react-icons/io5";
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
} from "react-icons/tb";

export const MakeQuiz = () => {
  const Final = () => {
    Swal.fire({
      icon: "success",
      title: "Quiz 생성 성공",
    });
  };

  return (
    <StyledDiv>
      <StyledGrid>
        <Obj />
        <Sub />
      </StyledGrid>

      <hr />
      <StyledRes>
        <AnswerList />
        <AnswerList />
      </StyledRes>

      <p
        style={{ textAlign: "center", fontWeight: "600", cursor: "pointer" }}
        onClick={() => Final()}
      >
        Quiz 생성하기
      </p>
    </StyledDiv>
  );
};

const AnswerList = () => {
  return (
    <StyledProblem>
      <p>문제 제목</p>
      <p>주관식</p>
    </StyledProblem>
  );
};

const Obj = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const one = useRef<HTMLInputElement>(null);
  const two = useRef<HTMLInputElement>(null);
  const three = useRef<HTMLInputElement>(null);
  const four = useRef<HTMLInputElement>(null);
  const ans = useRef<HTMLInputElement>(null);

  const [track, setTrack] = useState<boolean>(false);

  const Submit = () => {
    const ObjT = title.current!.value;
    const ObjContent = content.current!.value;
    const Bogi = [
      one.current!.value,
      two.current!.value,
      three.current!.value,
      four.current!.value,
    ];

    const answer = ans.current!.value;

    //axios.post()
  };

  const check = () => {
    Swal.fire({
      icon: "info",
      title: "AI에게 문제 생성을 요청중입니다.",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        //axios.post()
      },
    });
  };

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
      <ObjGrid>
        <StyledRow>
          <TbCircleNumber1 size={25} color={theme.navy} />
          <TextField
            id="outlined-multiline-static"
            color="primary"
            label="1번 보기 입력"
            style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
            inputRef={one}
          />
        </StyledRow>

        <StyledRow>
          <TbCircleNumber2 size={25} color={theme.navy} />
          <TextField
            id="outlined-multiline-static"
            color="primary"
            label="2번 보기 입력"
            style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
            inputRef={two}
          />
        </StyledRow>

        <StyledRow>
          <TbCircleNumber3 size={25} color={theme.navy} />
          <TextField
            id="outlined-multiline-static"
            color="primary"
            label="3번 보기 입력"
            style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
            inputRef={three}
          />
        </StyledRow>

        <StyledRow>
          <TbCircleNumber4 size={25} color={theme.navy} />
          <TextField
            id="outlined-multiline-static"
            color="primary"
            label="4번 보기 입력"
            style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
            inputRef={four}
          />
        </StyledRow>
      </ObjGrid>

      <TextField
        id="outlined-multiline-static"
        color="primary"
        label="정답 번호를 입력해주세요 ex) 3"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={ans}
      />

      <SbRow>
        <StyledRow onClick={() => setTrack(!track)}>
          <AiOutlineRobot size={23} color={theme.skyblue} />
          <StyledSubmit>AI에게 요청</StyledSubmit>
        </StyledRow>

        <StyledSubmit onClick={() => Submit()}>SUBMIT</StyledSubmit>
      </SbRow>

      {track ? (
        <StyledTrack>
          <p style={{ color: "gray", fontSize: "0.9em", fontWeight: "600" }}>
            강의자료를 선택해주세요.
          </p>
          <StyledOne>
            <p>강의자료1.pdf</p>
            <IoCheckboxOutline
              size={25}
              title="선택"
              style={{ cursor: "pointer" }}
              onClick={() => check()}
            />
          </StyledOne>
          <StyledOne>
            <p>강의자료1.pdf</p>
            <IoCheckboxOutline
              size={25}
              title="선택"
              style={{ cursor: "pointer" }}
              onClick={() => check()}
            />
          </StyledOne>
          <StyledOne>
            <p>강의자료1.pdf</p>
            <IoCheckboxOutline
              size={25}
              title="선택"
              style={{ cursor: "pointer" }}
              onClick={() => check()}
            />
          </StyledOne>
        </StyledTrack>
      ) : (
        <></>
      )}
    </StyledObj>
  );
};

const Sub = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const ans = useRef<HTMLInputElement>(null);

  const [track, setTrack] = useState<boolean>(false);

  const Submit = () => {
    const SubT = title.current!.value;
    const SubContent = content.current!.value;
    const answer = ans.current!.value;

    //axios.post
  };

  const check = () => {
    Swal.fire({
      icon: "info",
      title: "AI에게 문제 생성을 요청중입니다.",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        //axios.post()
      },
    });
  };

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

      <TextField
        id="outlined-multiline-static"
        multiline
        rows={3}
        color="primary"
        label="모범 답안을 입력해주세요"
        style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
        inputRef={ans}
      />
      <SbRow>
        <StyledRow onClick={() => setTrack(!track)}>
          <AiOutlineRobot size={23} color={theme.skyblue} />
          <StyledSubmit>AI에게 요청</StyledSubmit>
        </StyledRow>

        <StyledSubmit onClick={() => Submit()}>SUBMIT</StyledSubmit>
      </SbRow>

      {track ? (
        <StyledTrack>
          <p style={{ color: "gray", fontSize: "0.9em", fontWeight: "600" }}>
            강의자료를 선택해주세요.
          </p>
          <StyledOne>
            <p>강의자료1.pdf</p>
            <IoCheckboxOutline
              size={25}
              title="선택"
              style={{ cursor: "pointer" }}
              onClick={() => check()}
            />
          </StyledOne>
          <StyledOne>
            <p>강의자료1.pdf</p>
            <IoCheckboxOutline
              size={25}
              title="선택"
              style={{ cursor: "pointer" }}
              onClick={() => check()}
            />
          </StyledOne>
          <StyledOne>
            <p>강의자료1.pdf</p>
            <IoCheckboxOutline
              size={25}
              title="선택"
              style={{ cursor: "pointer" }}
              onClick={() => check()}
            />
          </StyledOne>
        </StyledTrack>
      ) : (
        <></>
      )}
    </StyledSub>
  );
};

const StyledProblem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 1em;
  border-radius: 15px;
  border: 1px solid lightgray;
`;

const StyledRes = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  padding: 1em;
`;

const StyledOne = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 1em;
  border-radius: 15px;
  background-color: #f0f0f0;
  justify-content: space-between;
  & > p {
    font-weight: 600;
  }
`;

const StyledTrack = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  padding: 0%.5;
`;

const SbRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const ObjGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
`;

const StyledSubmit = styled.p`
  width: fit-content;
  font-weight: 600;
  cursor: pointer;
  color: gray;
  &:hover {
    color: ${theme.navy};
  }
`;

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

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;
