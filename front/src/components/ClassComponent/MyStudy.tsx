import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { GoMilestone } from "react-icons/go";
import { IoIosSchool } from "react-icons/io";

interface RootState {
  user: {
    id: string;
    role: number;
  };
}

interface UserProps {
  feedback: string;
}

interface AiProps {
  milestoneName: string;
  quizNum: number;
  feedback: string;
}

class DataCollection {
  private userData: UserProps[];
  private aiData: AiProps[];

  constructor(userData: UserProps[], aiData: AiProps[]) {
    this.userData = userData;
    this.aiData = aiData;
  }

  // Getter 메서드로 userData 반환
  getUserData(): UserProps[] {
    return this.userData;
  }

  // Getter 메서드로 aiData 반환
  getAiData(): AiProps[] {
    return this.aiData;
  }
}

export const MyStudy = () => {
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  const fetchData = async () => {
    const response = await axios.get<{ user: UserProps[]; ai: AiProps[] }>(
      "http://localhost:8000/api"
    );
    return new DataCollection(response.data.user, response.data.ai);
  };

  const { data, isLoading, isError } = useQuery<DataCollection, Error>(
    "dataCollection",
    fetchData
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  const userData = data?.getUserData() || [];
  const aiData = data?.getAiData() || [];

  return (
    <StyledWrap>
      <p style={{ fontWeight: "600" }}>{id}님 학습 피드백</p>

      {aiData.map((ai, index) => (
        <AiFeedback
          key={index}
          milestoneName={ai.milestoneName}
          quizNum={ai.quizNum}
          feedback={ai.feedback}
        />
      ))}

      <hr />

      {userData.map((user, index) => (
        <UserFeedback key={index} feedback={user.feedback} />
      ))}
    </StyledWrap>
  );
};

const UserFeedback = ({ feedback }: UserProps) => {
  return (
    <StyledDiv style={{ border: "1px solid orange" }}>
      <Texthead>
        <StyledRow>
          <IoIosSchool size={22} color="orange" />
          <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
            교육자님의 피드백
          </p>
        </StyledRow>
      </Texthead>
      <p style={{ whiteSpace: "pre-wrap", paddingLeft: "0.5em" }}>{feedback}</p>
    </StyledDiv>
  );
};

const AiFeedback = ({ milestoneName, quizNum, feedback }: AiProps) => {
  return (
    <StyledDiv style={{ border: "1px solid skyblue" }}>
      <Texthead>
        <StyledRow>
          <GoMilestone size={22} color={theme.navy} />
          <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
            {milestoneName}
          </p>
        </StyledRow>

        <p style={{ fontSize: "0.9em", color: "gray", paddingLeft: "1em" }}>
          {quizNum}회차 Quiz에 대한 AI Feedback입니다.
        </p>
      </Texthead>
      <p style={{ whiteSpace: "pre-wrap", paddingLeft: "0.5em" }}>{feedback}</p>
    </StyledDiv>
  );
};

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 7px;
  align-items: center;
`;

const Texthead = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  border-radius: 15px;

  padding: 1em;
`;

const StyledWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;
