import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

type Props = {
  id: number;
};

export const GuideContent = ({ id }: Props) => {
  var mileStoneId = id;
  return (
    <StyledDiv>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <StyledP>Quiz</StyledP>
        <p style={{ fontWeight: "500", fontSize: "0.9em" }}>이정표 이름</p>
      </div>
    </StyledDiv>
  );
};

const StyledP = styled.p`
  font-weight: 600;
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
