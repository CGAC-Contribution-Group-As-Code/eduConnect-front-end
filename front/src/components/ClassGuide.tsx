import React, { useState, useRef, DragEvent } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { GoMilestone } from "react-icons/go";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { FiUploadCloud } from "react-icons/fi";
import { useQuery } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";

export const ClassGuide = () => {
  const [make, setMake] = useState<boolean>(false);

  return (
    <StyledContainer>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <StyledRow>
          <GoMilestone size={22} color={theme.navy} />
          <p style={{ fontWeight: "600", color: `${theme.navy}` }}>Milestone</p>
        </StyledRow>

        {make === false ? (
          <StyledRow
            style={{ cursor: "pointer" }}
            onClick={() => setMake(true)}
          >
            <p>이정표 생성하기</p>
            <AiOutlinePlusCircle size={20} color={theme.navy} />
          </StyledRow>
        ) : (
          <StyledRow
            style={{ cursor: "pointer" }}
            onClick={() => setMake(false)}
          >
            <p>닫기</p>
            <AiOutlineCloseCircle size={20} color="red" />
          </StyledRow>
        )}
      </div>

      {make === false ? (
        <StyledDiv>
          <Milestone />
          <Milestone />
          <Milestone />
        </StyledDiv>
      ) : (
        <CreateMilestone setMake={() => setMake(false)}></CreateMilestone>
      )}
    </StyledContainer>
  );
};

// 각 이정표

const Milestone = () => {
  return (
    <StyledBox>
      <p style={{ fontWeight: "600" }}>이차방정식과 함수</p>
      <p style={{ fontSize: "0.9em", color: "gray", textAlign: "end" }}>
        2023.11.15
      </p>
    </StyledBox>
  );
};

// 이정표 만들기

interface Offprops {
  setMake: (e: boolean) => void;
}

const CreateMilestone = ({ setMake }: Offprops) => {
  const mileName = useRef<HTMLInputElement>(null);
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File[]>([]);

  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newfiles = (target.files as FileList)[0];

    if (newfiles === undefined) {
      return;
    }

    setFile((file) => [...file, newfiles]);
  };

  // 파일 업로드 핸들러

  const fileUploadHandler = async () => {
    if (file !== undefined) {
      try {
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
          formData.append("file", file[i]); // 파일 배열에 있는 파일들을 순서대로 업로드
        }

        // // Axios를 이용해서 Back-End로 파일 업로드 요청!
        // // !!중요2. header에 content-type에 multipart/form-data를 설정!!
        // const axiosResponse = await axiosDefaultInstance.post<ApiResponse<FileUploadResponse>>("/files", formData, {"headers" : {"content-type" : "multipart/form-data"}})

        // // HttpStatus가 200번호 구역이 아니거나
        // // 서버에서 응답 코드로 0(성공)을 주지 않았을 경우
        // if(axiosResponse.status < 200 || axiosResponse.status >= 300 || axiosResponse.data.resultCode !== 0){
        //   // Error를 발생시켜 Catch문을 타게 만들어주는데, 서버에 응답받은 메시지를 넣어준다!
        //   // 서버에서 응답 메시지를 받지 못했을경우 기본 메시지 설정또한 함께 해준다
        //   throw Error(axiosResponse.data.message || "문제가 발생했어요!");
        // }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "error",
        });
      }
    }
  };

  const makeMilestone = () => {
    fileUploadHandler();
    console.log(file);
    if (mileName.current) {
      let name = mileName.current!.value;

      Swal.fire({
        icon: "success",
        title: `${name} 생성 완료`,
      }).then((res) => {
        if (res.isConfirmed) {
          setMake(false);
        }
      });
    }
  };

  return (
    <div style={{ display: "flex", flexFlow: "column nowrap", gap: "15px" }}>
      <TextField
        id="standard-basic"
        color="primary"
        label="이정표 이름"
        variant="standard"
        style={{ width: "50%" }}
        inputRef={mileName}
      />

      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        color="primary"
        label="간단한 설명"
        style={{ width: "80%", fontFamily: "HealthsetGothicLight" }}
        inputRef={desc}
      />

      <hr />

      <p>자료 업로드</p>

      <StyledRow>
        <TextField
          id="outlined-basic"
          label="강의 자료명"
          variant="outlined"
          style={{ width: "40%" }}
        />
        <input
          type="file"
          style={{ fontWeight: "500 !important" }}
          onChange={fileUploadValidHandler}
        />
      </StyledRow>

      <StyledRow>
        <TextField
          id="outlined-basic"
          label="강의 자료명"
          variant="outlined"
          style={{ width: "40%" }}
        />
        <input
          type="file"
          style={{ fontWeight: "500 !important" }}
          onChange={fileUploadValidHandler}
        />
      </StyledRow>

      <p
        style={{
          fontWeight: "600",
          width: "fit-content",
          alignSelf: "end",
          cursor: "pointer",
        }}
        id="makeMilestone"
        onClick={() => makeMilestone()}
      >
        생성하기!
      </p>
    </div>
  );
};

// const StyledDnd = styled.div`
//   height: "120px";
//   position: "relative";
//   border-radius: 15px;
//   border: 1px dotted gray;
//   padding: 1em;
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   justify-content: center;
// `;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

const StyledBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 1em;
  border-radius: 15px;
  background-color: aliceblue;
  cursor: pointer;
  gap: 10px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0.5em;
`;
