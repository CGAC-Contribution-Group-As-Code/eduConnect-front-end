import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { IoMdClose } from "react-icons/io";
import { ClassQuiz } from "./ClassQuiz";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { TbLocationPlus } from "react-icons/tb";
import { useQuery } from "react-query";
import axios from "axios";

type Props = {
  mile_id: string;
  onCloseHandler: () => void;
};

interface RootState {
  user: {
    id: string;
    role: number;
  };
}

interface MileStone {
  _id: string;
  name: string;
  desc: string;
  last_modify: string;
}

export const GuideContent = ({ mile_id, onCloseHandler }: Props) => {
  console.log(mile_id);

  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  const [isQuiz, setIsQuiz] = useState<boolean>(true);

  const room_id = decodeURI(window.location.pathname).split("/").at(-2);
  const {
    data: milestone_data,
    isLoading,
    isError,
  } = useQuery<MileStone, Error>({
    queryKey: ["mileston", mile_id],
    queryFn: async () => {
      const response = await axios.get<MileStone>(
        `http://localhost:8000/milestone/${mile_id}`
      );
      return response.data;
    },
  });

  return (
    <StyledDiv>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
          {milestone_data?.name}
        </p>

        <IoMdClose
          size={24}
          color="red"
          title="이정표 나가기"
          style={{ cursor: "pointer" }}
          onClick={onCloseHandler}
        />
      </div>

      <p
        style={{
          fontSize: "0.9em",
          whiteSpace: "pre-wrap",
          borderBottom: "1px solid lightgray",
          padding: "0px 5px 3px 5px",
        }}
      >
        {milestone_data?.desc}
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
                    fontSize: "1.2em",
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
                    fontSize: "1.2em",
                  }
                : { color: "gray" }
            }
          >
            강의 자료
          </StyledP>
        </StyledRow>

        {role === 1 && isQuiz === false ? (
          <StyledRow id="upload" style={{ alignSelf: "end" }}>
            <p>강의자료 업로드</p>
            <MdOutlineBookmarkAdd size={23} color={theme.skyblue} />
          </StyledRow>
        ) : role === 1 && isQuiz === true ? (
          <StyledRow id="upload" style={{ alignSelf: "end" }}>
            <p>퀴즈 생성</p>
            <TbLocationPlus size={23} color={theme.skyblue} />
          </StyledRow>
        ) : (
          <></>
        )}
      </div>

      {isQuiz ? <ClassQuiz /> : <Lecture mile_id={mile_id} />}
    </StyledDiv>
  );
};

export interface TypeProps {
  mile_id: string;
}

type content = {
  name: string;
  size: number;
  path: string;
  quiz: [];
};

const Lecture = ({ mile_id }: TypeProps) => {
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  const e = role;
  const {
    data: contents,
    isLoading,
    isError,
  } = useQuery<content[], Error>({
    queryKey: ["contents", mile_id],
    queryFn: async () => {
      const response = await axios.get<content[]>(
        `http://localhost:8000/milestone/${mile_id}/content`
      );
      return response.data;
    },
  });

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
    <>
      <StyledLecture>
        {contents?.map((content) => {
          return (
            <>
              <StyledPaper>
                <p style={{ cursor: "pointer" }}>{content.name}</p>
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
            </>
          );
        })}
      </StyledLecture>
    </>
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
