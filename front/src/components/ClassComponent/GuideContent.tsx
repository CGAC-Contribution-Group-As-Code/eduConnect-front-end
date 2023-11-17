import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { IoMdClose } from "react-icons/io";

type Props = {
  id: number;
  onCloseHandler: () => void;
};

export const GuideContent = ({ id, onCloseHandler }: Props) => {
  var mileStoneId = id;

  const [isQuiz, setIsQuiz] = useState<boolean>(false);

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
        <StyledP onClick={() => setIsQuiz(true)}>Quiz</StyledP>
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
    </StyledDiv>
  );
};

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

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
