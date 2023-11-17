import React, { useRef } from "react";
import styled from "styled-components";
import StyledDiv from "../styles/StyledDiv";
import StyledWrapper from "../styles/StyledWrapper";
import theme from "../styles/theme";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../api/reducers";

interface User {
  id: string;
  pw: string;
}

interface EnterUser {
  id: string;
  role: number;
}

export const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const id = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);

  const LoginMethod = async (data: User) => {
    const { data: res } = await axios.post(
      "http://localhost:8000/user/login",
      data
    );
    return res;
  };

  const { mutate, isLoading } = useMutation(LoginMethod, {
    onSuccess: (data) => {
      // const userInfo = data.uid
      var u_id = data.user_id;
      var u_role = data.role;

      var userInfo = { id: u_id, role: u_role };
      console.log(userInfo);
      dispatch(setUser(userInfo));
      Swal.fire({
        icon: "success",
        title: `${data.user_id}님 안녕하세요!`,
      });
      navigate("/home");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "로그인에 실패했습니다.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("success");
    },
  });

  const login = () => {
    let uid = id.current!.value;
    let upw = pw.current!.value;

    console.log(id.current, upw, "Adfadsf");

    var userInfo = {
      id: uid,
      pw: upw,
    };

    mutate(userInfo);
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledBG>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexFlow: "column nowrap",
              gap: "10px",
              paddingBottom: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              inputRef={id}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              inputRef={pw}
            />
          </div>

          <Styledh2 onClick={() => login()}>LOGIN</Styledh2>
        </StyledBG>
      </StyledDiv>
    </StyledWrapper>
  );
};

const StyledBG = styled.div`
  display: flex;
  flex-flow: column nowrap;

  background-image: url("/image/logo.png");
  background-repeat: no-repeat;
  background-position: 90%;
  background-size: 40%;
  width: 100%;
  height: 510px;
  gap: 15px;
  justify-content: center;
`;

const Styledh2 = styled.h2`
  font-size: 1.2em;
  font-weight: 600;
  font-family: "HealthsetGothicLight";
  margin: 0 !important;
  cursor: pointer;
  text-align: start;
  &:hover {
    color: ${theme.navy};
  }
`;

const StyledText = styled.p`
  font-size: 1em;
  font-weight: 500;
  color: gray;
`;
