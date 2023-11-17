import React, { useState, useRef, DragEvent } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { GoMilestone } from "react-icons/go";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import { FiUploadCloud } from "react-icons/fi";
import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { GuideContent } from "./GuideContent";

export const ClassGuide = () => {
  const [make, setMake] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<number>(0);

  const openHandler = (id: number) => {
    setIsOpen(id);
  };

  return (
    <StyledContainer>
      {isOpen === 0 ? (
        <>
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
              <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
                Milestone
              </p>
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
              <Milestone openHandler={openHandler} />
              <Milestone openHandler={openHandler} />
              <Milestone openHandler={openHandler} />
            </StyledDiv>
          ) : (
            <CreateMilestone setMake={() => setMake(false)}></CreateMilestone>
          )}
        </>
      ) : (
        <>
          <GuideContent id={isOpen} />
        </>
      )}
    </StyledContainer>
  );
};

// 각 이정표

type Props = {
  openHandler: (id: number) => void;
};

const Milestone = ({ openHandler }: Props) => {
  return (
    <StyledBox onClick={() => openHandler(1)}>
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

interface MakeMilestone {
  name: string;
  desc: string;
  filename1: string;
  filename2: string;
  file: Promise<FormData | undefined>;
}

const CreateMilestone = ({ setMake }: Offprops) => {
  const mileName = useRef<HTMLInputElement>(null);
  const descName = useRef<HTMLInputElement>(null);
  const fN1 = useRef<HTMLInputElement>(null);
  const fN2 = useRef<HTMLInputElement>(null);
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

        return formData;
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "error",
        });
      }
    }
  };

  const CreateMile = async (data: MakeMilestone) => {
    const { data: response } = await axios.post(``, data);
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(CreateMile, {
    onSuccess: (data) => {
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "${data.name} 이정표가 생성되었습니다",
      });
    },
    onError: () => {
      console.log("error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const onSubmit = () => {
    let nameMile = mileName.current!.value;
    let descMile = mileName.current!.value;
    let fileN1 = fN1.current!.value;
    let fileN2 = fN2.current!.value;

    var arr = fileUploadHandler();

    var data = {
      name: nameMile,
      desc: descMile,
      filename1: fileN1,
      filename2: fileN2,
      file: arr,
    };

    const milestone = {
      ...data,
    };
    mutate(milestone);
    setMake(false);
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
        inputRef={descName}
      />

      <hr />

      <p>자료 업로드</p>

      <StyledRow>
        <TextField
          id="outlined-basic"
          label="강의 자료명"
          variant="outlined"
          style={{ width: "40%" }}
          inputRef={fN1}
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
          inputRef={fN2}
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
        onClick={() => onSubmit()}
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
