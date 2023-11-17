import React, { useState, useRef } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { PiNotePencil } from "react-icons/pi";
import TextField from "@mui/material/TextField";
import { LuUserCircle2 } from "react-icons/lu";

// 강의실 학생 관리 Component
// 선생일 때만

interface EachProps {
  u_id: string;
  ai_feedback: string[];
  user_feedback: string[];
}

class FeedbackCollection {
  private feedbackArray: EachProps[];

  constructor(feedbackArray: EachProps[]) {
    this.feedbackArray = feedbackArray;
  }

  // Getter 메서드로 feedbackArray 반환
  getFeedbackArray(): EachProps[] {
    return this.feedbackArray;
  }
}

export const StdMng = () => {
  const fetchData = async () => {
    const response = await axios.get<EachProps[]>(
      "http://localhost:8000/feedback"
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<EachProps[], Error>(
    "feedbackData",
    fetchData
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  const feedbackCollectionInstance = new FeedbackCollection(data || []);

  const exampleData: EachProps = {
    u_id: "user123",
    ai_feedback: ["Great job!", "Needs improvement", "Well done"],
    user_feedback: ["더 잘해보자", "미분에서의 부족함은 보충학습해보자"],
  };

  return (
    <StyledWrap>
      <p style={{ fontWeight: "600" }}>학습자 관리</p>
      {feedbackCollectionInstance.getFeedbackArray().map((feedback, index) => (
        <div key={index}>
          <EachUser
            u_id={feedback.u_id}
            ai_feedback={feedback.ai_feedback}
            user_feedback={feedback.user_feedback}
          />
        </div>
      ))}
    </StyledWrap>
  );
};

const EachUser = ({ u_id, ai_feedback, user_feedback }: EachProps) => {
  const content = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const submit = () => {
    const detail = content.current!.value;

    Swal.fire({
      icon: "success",
      title: `${detail}\n 작성완료`,
    });
  };

  return (
    <StyleCon>
      <StyledRow>
        <LuUserCircle2 size={23} color={theme.navy} />
        <p style={{ fontWeight: "600" }}>{u_id}님</p>
      </StyledRow>

      <hr />
      <StyledRow style={{ marginBottom: "10px" }}>
        <AiOutlineRobot size={23} color={theme.navy} />
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
          AI의 Feedback
        </p>
      </StyledRow>

      <div style={{ marginBottom: "20px" }}>
        {ai_feedback.map((item, index) => (
          <div
            style={{
              borderBottom: "1px solid lightgray",
              display: "grid",
              gridTemplateColumns: "15px auto",
              columnGap: "5px",
              padding: "0.3em 1em",
            }}
            key={index}
          >
            {index + 1}. <p style={{ whiteSpace: "pre-wrap" }}>{item}</p>
          </div>
        ))}
      </div>

      <StyledRow style={{ marginBottom: "10px" }}>
        <FaChalkboardTeacher size={23} color={theme.navy} />
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
          교육자 Feedback
        </p>
      </StyledRow>

      <div style={{ marginBottom: "20px" }}>
        {user_feedback.map((item, index) => (
          <div
            style={{
              borderBottom: "1px solid lightgray",
              display: "grid",
              gridTemplateColumns: "15px auto",
              columnGap: "5px",
              padding: "0.3em 1em",
            }}
            key={index}
          >
            {index + 1}. <p style={{ whiteSpace: "pre-wrap" }}>{item}</p>
          </div>
        ))}
      </div>

      <StyledRow
        style={{ marginBottom: "10px", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <PiNotePencil size={23} color={theme.navy} />
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
          Feedback 작성하기
        </p>
      </StyledRow>

      {open ? (
        <div
          style={{ display: "flex", flexFlow: "column nowrap", gap: "10px" }}
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

          <p
            style={{
              fontWeight: "600",
              color: `${theme.navy}`,
              cursor: "pointer",
              width: "fit-content",
              alignSelf: "end",
              paddingRight: "10px",
            }}
            onClick={() => submit()}
          >
            SUBMIT
          </p>
        </div>
      ) : (
        <></>
      )}
    </StyleCon>
  );
};

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

const StyleCon = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 1em;
  border-radius: 15px;
  background-color: #f0f0f0;
`;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;
