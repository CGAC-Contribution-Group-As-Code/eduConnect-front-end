import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MdOutlineArrowOutward } from "react-icons/md";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useQuery } from "react-query";

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

interface RoundProps {
  roundNum: number;
  quiz: Quiz[];
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

interface ObjProps {
  num: number; //문제번호
  title: string; //문제 제목
  desc: string; //문제 설명
  isCorrect: number; // 문제 맞았는지 여부
  taskDesc: string[]; // 1~4보기 설명
  myCheck: string; //내가 선택했던 문제 번호 default = -1
}
// isCorrect = 0 아직 안품, 1 = 정답, -1 = 오답

interface SubProps {
  num: number; // 문제번호
  title: string; // 문제 제목
  desc: string; // 문제 설명
  isCorrect: number; // 정답 여부
  myAnswer: string; // 내가 작성했던 답
}

export const ClassQuiz: React.FC<ContentProps> = ({ contents }) => {
  // 제일 윗단 컴포넌트
  const dispatch = useDispatch();
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  return (
    <>
      {contents.map((value) => {
        return (
          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <>
              {value.roundes.map((item, idx) => {
                return <Round roundNum={idx + 1} quiz={item.quiz} key={idx} />;
              })}
            </>
          </div>
        );
      })}
    </>
  );
};

const Round = ({ roundNum, quiz }: RoundProps) => {
  const [num, setNum] = useState<number>(roundNum); // 각 회차 번호 state
  const [resultData, setResultData] = React.useState(quiz); // 각 회차 결과가 담길 배열

  useEffect(() => {
    setNum(roundNum);
    setResultData(quiz);
  }, [roundNum, quiz]);

  const postResult = () => {
    //axios.post
    Swal.fire({
      icon: "success",
      title: "제출 성공",
    });
  };

  return (
    <StyledWrap>
      <p style={{ color: "gray", fontSize: "0.9em" }}>{num}회차 Quiz</p>

      {resultData.map((task, index) => (
        <div key={index}>
          {task.type === "0" ? (
            <Objective
              num={index + 1}
              title={task.title}
              desc={task.desc}
              isCorrect={0}
              taskDesc={task.etc}
              myCheck={"-1"}
            />
          ) : (
            <Subjective
              num={index + 1}
              title={task.title}
              desc={task.desc}
              isCorrect={0}
              myAnswer={""}
            />
          )}
        </div>
      ))}

      <SubmitRow style={{ alignSelf: "end" }} onClick={() => postResult()}>
        <p>제출하기</p>
        <MdOutlineArrowOutward />
      </SubmitRow>
    </StyledWrap>
  );
};

const Objective = ({
  num,
  title,
  desc,
  isCorrect,
  taskDesc,
  myCheck,
}: ObjProps) => {
  const [value, setValue] = React.useState(myCheck);
  const [scoring, setScoring] = useState<number>(isCorrect);
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  useEffect(() => {
    setScoring(isCorrect);
  }, [isCorrect]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (myCheck !== "-1") {
      setValue(myCheck);
    } else {
      setValue((event.target as HTMLInputElement).value);
    }
  };

  return (
    <StyledObj
      style={
        scoring === -1
          ? { backgroundColor: "#fad0d0" }
          : scoring === 1
          ? { backgroundColor: "aliceblue" }
          : { backgroundColor: "transparent" }
      }
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOpenCheck(!openCheck)}
        title="문제 열기"
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StyledRow>
            <p style={{ fontWeight: "600", color: "gray", fontSize: "0.9em" }}>
              No.{num}
            </p>
            <p style={{ fontSize: "1em", fontWeight: "600" }}>{title}</p>
          </StyledRow>
          {scoring === 0 ? (
            <></>
          ) : scoring === 1 ? (
            <StyledRow>
              <IoCheckmarkCircleOutline size={23} color={theme.skyblue} />
              <p
                style={{
                  fontSize: "1em",
                  fontWeight: "600",
                  color: `${theme.skyblue}`,
                }}
              >
                정답
              </p>
            </StyledRow>
          ) : (
            <StyledRow>
              <IoCloseCircleOutline size={23} color="red" />
              <p style={{ fontSize: "1em", fontWeight: "600", color: "red" }}>
                오답
              </p>
            </StyledRow>
          )}
        </div>
        <div style={{ padding: "0.5em" }}>
          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "0.9em",
              fontWeight: "600",
            }}
          >
            {desc}
          </p>
        </div>
      </div>

      {/* 문제뜨는 부분 */}

      {openCheck ? (
        <StyledTask>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              // color={isCorrect === -1 ? "secondary" : "primary"}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={taskDesc[0]}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={taskDesc[1]}
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label={taskDesc[2]}
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label={taskDesc[3]}
              />
            </RadioGroup>
          </FormControl>
        </StyledTask>
      ) : (
        <></>
      )}
    </StyledObj>
  );
};

const Subjective = ({ num, title, desc, isCorrect, myAnswer }: SubProps) => {
  const [value, setValue] = React.useState(myAnswer);
  const [scoring, setScoring] = useState<number>(isCorrect);
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  const content = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setScoring(isCorrect);
  }, [isCorrect]);

  return (
    <StyledSub
      style={
        scoring === -1
          ? { backgroundColor: "#fad0d0" }
          : scoring === 1
          ? { backgroundColor: "aliceblue" }
          : { backgroundColor: "transparent" }
      }
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOpenCheck(!openCheck)}
        title="문제 열기"
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StyledRow>
            <p style={{ fontWeight: "600", color: "gray", fontSize: "0.9em" }}>
              No.{num}
            </p>
            <p style={{ fontSize: "1em", fontWeight: "600" }}>{title}</p>
          </StyledRow>
          {scoring === 0 ? (
            <></>
          ) : scoring === 1 ? (
            <StyledRow>
              <IoCheckmarkCircleOutline size={23} color={theme.skyblue} />
              <p
                style={{
                  fontSize: "1em",
                  fontWeight: "600",
                  color: `${theme.skyblue}`,
                }}
              >
                정답
              </p>
            </StyledRow>
          ) : (
            <StyledRow>
              <IoCloseCircleOutline size={23} color="red" />
              <p style={{ fontSize: "1em", fontWeight: "600", color: "red" }}>
                오답
              </p>
            </StyledRow>
          )}
        </div>
        <div style={{ padding: "0.5em" }}>
          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "0.9em",
              fontWeight: "600",
            }}
          >
            {desc}
          </p>
        </div>
      </div>

      {openCheck ? (
        <div>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            color="primary"
            label="서술형 답 작성"
            style={{ width: "100%", fontFamily: "HealthsetGothicLight" }}
            inputRef={content}
          />
        </div>
      ) : (
        <></>
      )}
    </StyledSub>
  );
};

const StyledTask = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  column-gap: 15px;
  justify-items: start;
  align-items: end;
`;

const SubmitRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9em;
  &:hover {
    color: ${theme.navy};
  }
`;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

const StyledObj = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid ${theme.skyblue};
  padding: 1em;
`;

const StyledSub = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid ${theme.navy};
  padding: 1em;
`;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  padding: 1em;
  border-radius: 15px;
  border: 1px solid lightgray;
`;
