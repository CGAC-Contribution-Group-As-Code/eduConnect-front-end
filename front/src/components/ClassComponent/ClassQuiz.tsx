import React, { useState } from "react";
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

interface RootState {
  user: {
    id: string;
    role: number;
  };
}

interface ObjProps {
  num: number;
  title: string;
  desc: string;
  isCorrect: number;
  taskDesc: string[];
  checkNum: string;
}
// isCorrect = 0 아직 안품, 1 = 정답, -1 = 오답

interface SubProps {
  num: number;
  title: string;
  desc: string;
  isCorrect: number;
}

export const ClassQuiz = () => {
  const dispatch = useDispatch();
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      <Objective
        num={1}
        title={"문제 제목"}
        desc={"문제 설명"}
        isCorrect={0}
        taskDesc={["task1", "task2", "task3", "task4"]}
        checkNum={"-1"}
      />
      <Objective
        num={2}
        title={"문제 제목"}
        desc={"문제 설명"}
        isCorrect={1}
        taskDesc={["task1", "task2", "task3", "task4"]}
        checkNum={"2"}
      />

      <Objective
        num={3}
        title={"문제 제목"}
        desc={"문제 설명"}
        isCorrect={-1}
        taskDesc={["task1", "task2", "task3", "task4"]}
        checkNum={"1"}
      />
    </div>
  );
};

const Objective = ({
  num,
  title,
  desc,
  isCorrect,
  taskDesc,
  checkNum,
}: ObjProps) => {
  const [value, setValue] = React.useState("");

  // if (checkNum !== "-1") {
  //   setValue(checkNum);
  // }

  const [openCheck, setOpenCheck] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const SubmitCheck = () => {
    console.log(value);

    Swal.fire({
      icon: "success",
      title: "제출 성공",
    });
  };

  return (
    <StyledObj
      style={
        isCorrect === -1
          ? { backgroundColor: "#fad0d0" }
          : isCorrect === 1
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
          {isCorrect === 0 ? (
            <></>
          ) : isCorrect === 1 ? (
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

          {isCorrect === 0 ? (
            <SubmitRow onClick={() => SubmitCheck()}>
              <p>제출</p>
              <MdOutlineArrowOutward size={24} />
            </SubmitRow>
          ) : (
            <></>
          )}
        </StyledTask>
      ) : (
        <></>
      )}
    </StyledObj>
  );
};

const Subjective = ({ num, title, desc, isCorrect }: SubProps) => {
  return <StyledSub></StyledSub>;
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
  border-radius: 15px;
  border: 1px solid ${theme.navy};
  padding: 1em;
`;
