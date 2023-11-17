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
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface QuestionInfo {
  _id: string;
  writer: string;
  time: string;
  desc: string;
  answer: [];
}

interface RootState {
  user: {
    id: string;
    role: number;
  };
}

export const ClassQA = () => {
  const room_id = decodeURI(window.location.pathname).split("/").at(-2);
  const [openQuestion, setOpenQuestion] = useState<boolean>(false);
  const [reload, setReload] = useState<string>("question");

  const {
    data: question,
    isLoading,
    isError,
  } = useQuery<QuestionInfo[], Error>({
    queryKey: reload,
    queryFn: async () => {
      const response = await axios.get<QuestionInfo[]>(
        `http://localhost:8000/room/${room_id}/questions`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  const updateReloadState = (newState: string) => {
    setReload(newState);
    setOpenQuestion(false);
  };

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

      {openQuestion ? (
        <MakeQuestion updateReloadState={updateReloadState} />
      ) : (
        <></>
      )}

      <StyledCon>
        {question && question.length > 0 ? (
          question.map((questionInfo) => {
            return (
              <Question
                updateReloadState={updateReloadState}
                questionInfo={questionInfo}
                key={questionInfo.time}
              />
            );
          })
        ) : (
          <></>
        )}
      </StyledCon>
    </div>
  );
};

interface MakeQuestionProps {
  updateReloadState: (newState: string) => void; // 부모로부터 전달된 콜백 함수의 타입
}

const MakeQuestion: React.FC<MakeQuestionProps> = ({ updateReloadState }) => {
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;
  const content = useRef<HTMLInputElement>(null);
  const room_id = decodeURI(window.location.pathname).split("/").at(-2);

  function onSubmitHandler(): void {
    console.log(id, content.current?.value);

    axios
      .post("http://localhost:8000/room/questions", {
        room_id: room_id,
        writer: id,
        desc: content.current?.value,
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "질문이 생성되었습니다",
          }).then((swalRes) => {
            if (swalRes.isConfirmed) {
              updateReloadState("question" + crypto.randomUUID());
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "질문 생성에 실패했습니다.",
        });
      });
  }

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
        onClick={() => onSubmitHandler()}
      >
        <TbMessageCircleQuestion color={theme.navy} size={25} />
        <StyledP>질문 등록</StyledP>
      </div>
    </div>
  );
};

interface QuestionProps {
  questionInfo: QuestionInfo;
  updateReloadState: (newState: string) => void;
}

// 질문 component
const Question: React.FC<QuestionProps> = ({
  questionInfo,
  updateReloadState,
}) => {
  const [openAnswer, setOpenAnswer] = useState<boolean>(false);
  const [makeAnswer, setMakeAnswer] = useState<boolean>(false);
  const answer = questionInfo.answer;

  function onAISubmitHandler(): void {
    console.log(questionInfo);
    axios
      .post(
        "http://localhost:8000/room/ai-answer",
        {},
        {
          params: {
            question: questionInfo.desc,
            q_id: questionInfo._id,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "ai답변이 생성되었습니다",
          }).then((swalRes) => {
            if (swalRes.isConfirmed) {
              updateReloadState("question_answer" + crypto.randomUUID());
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "ai답변 생성에 실패했습니다.",
        });
      });
  }

  return (
    <StyledQuestion>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOpenAnswer(!openAnswer)}
        title="클릭해 답변 보기"
      >
        <StyledTextheader>
          <p>{questionInfo.writer}</p>
          <p>{new Date(questionInfo.time).toDateString()}</p>
        </StyledTextheader>

        <p
          style={{
            whiteSpace: "pre-wrap",
            padding: " 5px 10px",
            minHeight: "70px",
          }}
        >
          {" "}
          {questionInfo.desc}
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

            <StyledRow2 onClick={() => onAISubmitHandler()}>
              <AiOutlineRobot size={23} />
              <p>AI에게 질문하기</p>
            </StyledRow2>
          </div>

          {makeAnswer ? (
            <MakeAnswer
              updateReloadState={updateReloadState}
              question_id={questionInfo._id}
            />
          ) : (
            <></>
          )}

          {answer && answer.length > 0 ? (
            answer.map((value) => {
              return <Answer info={value} />;
            })
          ) : (
            <div />
          )}
        </div>
      ) : (
        <></>
      )}
    </StyledQuestion>
  );
};

interface MakeAnswerProps {
  question_id: string;
  updateReloadState: (newState: string) => void;
}

const MakeAnswer: React.FC<MakeAnswerProps> = ({
  updateReloadState,
  question_id,
}) => {
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;
  const content = useRef<HTMLInputElement>(null);

  function onSubmitHandler(): void {
    console.log(id, content.current?.value, question_id);
    axios
      .post("http://localhost:8000/room/answer", {
        question_id: question_id,
        ans_writer: id,
        answer: content.current?.value,
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "질문이 생성되었습니다",
          }).then((swalRes) => {
            if (swalRes.isConfirmed) {
              updateReloadState("question_answer" + crypto.randomUUID());
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "질문 생성에 실패했습니다.",
        });
      });
  }

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
        onClick={() => onSubmitHandler()}
      >
        <IoSchoolSharp color={theme.navy} size={25} />
        <StyledP>답변 등록</StyledP>
      </div>
    </div>
  );
};

interface AnswerProps {
  info: {
    ans_time: string;
    ans_writer: string;
    answer: string;
  };
}

// 답변 component
const Answer: React.FC<AnswerProps> = ({ info }) => {
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
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
          {info.ans_writer}
        </p>
        <p style={{ color: "gray", fontSize: "0.9em" }}>
          {new Date(info.ans_time).toDateString()}
        </p>
      </div>
      <p style={{ whiteSpace: "pre-wrap", padding: "0.5em 1.5em" }}>
        {info.answer}
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
