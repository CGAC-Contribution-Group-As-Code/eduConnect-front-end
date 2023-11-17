import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";

// 강의실 학생 관리 Component
// 선생일 때만
export const StdMng = () => {
  const exampleData: EachProps = {
    u_id: "user123",
    feedback: ["Great job!", "Needs improvement", "Well done"],
  };

  return (
    <StyledWrap>
      <p style={{ fontWeight: "600" }}>학습자 관리</p>
      <EachUser u_id={exampleData.u_id} feedback={exampleData.feedback} />
      <EachUser u_id={exampleData.u_id} feedback={exampleData.feedback} />
      <EachUser u_id={exampleData.u_id} feedback={exampleData.feedback} />
    </StyledWrap>
  );
};

interface EachProps {
  u_id: string;
  feedback: string[];
}

const EachUser = ({ u_id, feedback }: EachProps) => {
  return (
    <StyleCon>
      <p style={{ fontWeight: "600" }}>{u_id}님</p>
      <hr />
      <StyledRow style={{ marginBottom: "10px" }}>
        <AiOutlineRobot size={23} color={theme.navy} />
        <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
          AI의 Feedback
        </p>
      </StyledRow>

      <div style={{ marginBottom: "20px" }}>
        {feedback.map((item, index) => (
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
          Feedback 작성하기
        </p>
      </StyledRow>
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
