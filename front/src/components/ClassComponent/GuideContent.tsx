import React, { useCallback, useRef, useState } from "react";
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
import { useMutation, useQueryClient } from "react-query";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MakeQuiz } from "./MakeQuiz";

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

interface Quiz {
  type: string;
  answer: string;
  title: string;
  desc: string;
  etc: string[];
}

interface Round {
  r_id: string;
  quiz: Quiz[];
}

interface Content {
  name: string;
  path: string;
  size: number;
  roundes: Round[];
}
interface MileStone {
  _id: string;
  name: string;
  desc: string;
  last_modify: string;
  contents: Content[];
}

interface ContentProps {
  contents: Content[];
}

export const GuideContent = ({ mile_id, onCloseHandler }: Props) => {
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  const [isQuiz, setIsQuiz] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setSelectedFile(e.target.files[0]); // 파일 선택 시 상태 업데이트
  };

  const onUploadButtonClick = () => {
    if (selectedFile) {
      // 선택한 파일을 서버로 업로드하거나 다른 작업을 수행할 수 있음

      const formData = new FormData();

      formData.append("file", selectedFile);
      // 여기에 서버로 파일을 업로드하는 코드를 추가하면 됩니다.
      axios
        .post(`http://localhost:8000/milestone/${mile_id}/content`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "업로드 성공",
          });
        });
    } else {
      alert("파일을 선택해주세요.");
    }
  };

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

  const [putFile, setPutFile] = useState<boolean>(false);
  const [onMake, setOnMake] = useState<boolean>(false);

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
        </StyledRow>

        {role === 1 && isQuiz === false ? (
          <StyledRow
            id="upload"
            style={{ alignSelf: "end" }}
            onClick={() => setPutFile(!putFile)}
          >
            <p>강의자료 업로드</p>
            <MdOutlineBookmarkAdd size={23} color={theme.skyblue} />
          </StyledRow>
        ) : role === 1 && isQuiz === true ? (
          <StyledRow
            id="upload"
            style={{ alignSelf: "end" }}
            onClick={() => setOnMake(!onMake)}
          >
            <p>퀴즈 생성</p>
            <TbLocationPlus size={23} color={theme.skyblue} />
          </StyledRow>
        ) : (
          <></>
        )}
      </div>

      {!isQuiz && putFile ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            gap: "50px",
            alignItems: "center",
            border: "1px solid lightgray",
            borderRadius: "15px",
            padding: "0.5em 2vw",
          }}
        >
          <IoCloudUploadOutline
            style={{ cursor: "pointer" }}
            title="Upload"
            size={23}
            color={theme.navy}
            onClick={onUploadButtonClick}
          />
          <input type="file" accept=".pdf" ref={inputRef} onChange={onUpload} />
        </div>
      ) : (
        <></>
      )}

      {isQuiz && onMake ? (
        <MakeQuiz />
      ) : isQuiz && onMake === false ? (
        milestone_data?.contents ? (
          <ClassQuiz contents={milestone_data?.contents} />
        ) : (
          <p>No tasks available</p>
        )
      ) : (
        <Lecture mile_id={mile_id} />
      )}
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

  const [openPDF, setOpenPDF] = useState<string>("");

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

  const openPDFHandler = (contentPath: string) => {
    const a = document.createElement("a");
    const path = contentPath.split("/");
    a.href = `http://localhost:8000/milestone/${path[0]}/content/${path[1]}`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    console.log(a);
    setTimeout(() => {
      a.remove();
    }, 1000);
  };

  return (
    <>
      <StyledLecture>
        {contents?.map((content) => {
          return (
            <>
              <StyledPaper key={content.path}>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => openPDFHandler(content.path)}
                >
                  {content.name}
                </p>
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
