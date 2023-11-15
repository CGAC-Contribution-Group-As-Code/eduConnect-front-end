import React, { useRef, useState } from "react";
import styled from "styled-components";
import StyledDiv from "../styles/StyledDiv";
import StyledWrapper from "../styles/StyledWrapper";
import TextField from "@mui/material/TextField";
import theme from "../styles/theme";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

export const MakeClass = () => {
  const navigate = useNavigate();
  const name = useRef<HTMLInputElement>(null);

  const make = () => {
    Swal.fire({
      icon: "success",
      title: `${name.current!.value} 개설 성공했습니다!`,
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <Styledh2>강의 개설</Styledh2>

        <TextField
          id="standard-basic"
          color="primary"
          label="강의 명"
          variant="standard"
          style={{ width: "70%" }}
          inputRef={name}
        />

        <StyledGrid>
          <StyledBox>
            <StyledText style={{ color: `${theme.navy}` }}>
              전체 학습자 리스트
            </StyledText>

            <Student />
          </StyledBox>

          <StyledBox>
            <StyledText style={{ color: `${theme.skyblue}` }}>
              추가된 학습자 리스트
            </StyledText>
          </StyledBox>
        </StyledGrid>

        <Styledh2
          id="submit_btn"
          style={{
            fontSize: "1em",
            alignSelf: "end",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={() => make()}
        >
          개설하기!
        </Styledh2>
      </StyledDiv>
    </StyledWrapper>
  );
};

const Student = () => {
  interface User {
    _id: string;
    user_id: string;
    teacher: string;
  }

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[], Error>({
    queryKey: "users",
    queryFn: async () => {
      const response = await axios.get<User[]>(
        "http://localhost:8000/all-user"
      );
      return response.data;
    },
  });

  const add = (id: string) => {
    Swal.fire({
      icon: "success",
      title: `${id}님을 강의에 추가했습니다.`,
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  if (users) {
    return (
      <>
        {users.map((user) => (
          <StyledItem id="addMem" key={user._id}>
            {" "}
            {/* Add key attribute */}
            <p style={{ fontWeight: "600" }}>{user.user_id}</p>
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              size={20}
              color="gray"
              onClick={() => add(user.user_id)}
            />
          </StyledItem>
        ))}
      </>
    );
  }

  return null;
};

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 0.5fr;
  border-bottom: 1px solid lightgray;
  padding: 0.3em 1vw;
  justify-items: center;
`;

const StyledBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 7px;
  border-radius: 15px;
  border: 1px solid lightgray;
  width: 100%;
  padding: 1em;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2vw;
  justify-items: center;
  margin: 1em 0;
`;

const Styledh2 = styled.h2`
  font-size: 1.2em;
  font-weight: 600;
  font-family: "HealthsetGothicLight";
  margin: 0 !important;
`;

const StyledText = styled.p`
  font-size: 1em;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.5em;
`;
