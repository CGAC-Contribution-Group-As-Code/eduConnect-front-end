import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

interface Room {
  _id: string;
  name: string;
  teacher: string;
  member: number;
}

export const Classroom = () => {
  const navigate = useNavigate();

  const {
    data: classroom,
    isLoading,
    isError,
  } = useQuery<Room[], Error>({
    queryKey: "rooms",
    queryFn: async () => {
      const response = await axios.get<Room[]>("http://localhost:8000/room");
      return response.data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  if (classroom) {
    return (
      <>
        {classroom.map((room) => {
          return (
            <StyledBox
              key={room._id}
              onClick={() => navigate(`/class/${room._id}/${room.name}`)}
            >
              <p style={{ fontWeight: "600", fontSize: "1.1em" }}>
                {room.name}
              </p>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "space-between",
                }}
              >
                <p>교육자 : {room.teacher}님</p>
                <p style={{ color: "gray", fontSize: "0.9em" }}>
                  현재 인원 : {room.member}명
                </p>
              </div>
            </StyledBox>
          );
        })}
      </>
    );
  }

  return null;
};

const StyledBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: #f3f3f3;
  border-radius: 15px;
  padding: 1em 1vw;
  min-width: 330px;
  background-image: url("/image/logo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%;
  min-height: 140px;
  cursor: pointer;
`;
