import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { IoMdClose } from "react-icons/io";
import { ClassQuiz } from "./ClassQuiz";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { MdOutlineBookmarkAdd } from "react-icons/md";

type Props = {
  id: number;
  onCloseHandler: () => void;
};

export const GuideContent = ({ id, onCloseHandler }: Props) => {
  var mileStoneId = id;

  const [isQuiz, setIsQuiz] = useState<boolean>(false);

  return (
    <StyledDiv>
      <p
        style={{
          fontSize: "0.9em",
          whiteSpace: "pre-wrap",
          borderBottom: "1px solid lightgray",
          padding: "0px 5px 3px 5px",
        }}
      >
        간단한 설명
      </p>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <StyledRow>
          <StyledP
            onClick={() => setIsQuiz(true)}
            style={
              isQuiz
                ? {
                    color: `${theme.skyblue}`,
                    fontWeight: "600",
                  }
                : { color: "gray" }
            }
          >
            Quiz
          </StyledP>
          <StyledP
            onClick={() => setIsQuiz(false)}
            style={
              isQuiz === false
                ? {
                    color: `${theme.skyblue}`,
                    fontWeight: "600",
                  }
                : { color: "gray" }
            }
          >
            강의 자료
          </StyledP>
        </StyledRow>

        <StyledRow>
          <p style={{ fontWeight: "500", fontSize: "0.9em" }}>이정표 이름</p>
          <IoMdClose
            size={24}
            color="red"
            title="이정표 나가기"
            style={{ cursor: "pointer" }}
            onClick={onCloseHandler}
          />
        </StyledRow>
      </div>

      {isQuiz ? <ClassQuiz /> : <Lecture />}
    </StyledDiv>
  );
};

const Lecture = () => {
  return (
    <>
      <StyledRow id="upload" style={{ alignSelf: "end" }}>
        <p>강의자료 업로드</p>
        <MdOutlineBookmarkAdd size={23} color={theme.skyblue} />
      </StyledRow>
      <StyledLecture>
        <Paper role={1} name={"강의자료 1.pdf"} />
        <Paper role={0} name={"강의자료 1.pdf"} />
      </StyledLecture>
    </>
  );
};

export interface TypeProps {
  role: number;
  name: string;
}

const Paper = ({ role, name }: TypeProps) => {
  const e = role;
  const n = name;

  const deletePaper = () => {
    Swal.fire({
      icon: "warning",
      title: "강의자료를 정말 삭제하시겠습니까?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "삭제 완료했습니다.",
        });
      }
    });
  };
  return (
    <StyledPaper>
      <p style={{ cursor: "pointer" }}>{n}</p>
      {/* 클릭 이벤트 -> 이정표의 강의자료 화면으로 이동 */}
      {e === 1 ? (
        <StyledRow>
          <AiOutlineDownload
            size={23}
            color={theme.navy}
            style={{ cursor: "pointer" }}
            title="내 컴퓨터에 저장"
          />
          <span style={{ width: "10px" }}></span>
          <AiOutlineDelete
            size={23}
            color="red"
            style={{ cursor: "pointer" }}
            title="강의자료 삭제"
            onClick={() => deletePaper()}
          />
        </StyledRow>
      ) : (
        <AiOutlineDownload
          size={23}
          color={theme.navy}
          style={{ cursor: "pointer" }}
          title="내 컴퓨터에 저장"
        />
      )}
    </StyledPaper>
  );
};

const StyledPaper = styled.div`
  /* margin: 0.5em 1vw; */
  border-radius: 15px;
  background-color: #f7f7f7;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

const StyledLecture = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 0.7em 0.3em;
`;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

const StyledP = styled.p`
  cursor: pointer;
  &:hover {
    color: ${theme.skyblue};
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;
