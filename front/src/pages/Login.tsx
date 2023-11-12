import React from "react";
import styled from "styled-components";
import StyledDiv from "../styles/StyledDiv";
import StyledWrapper from "../styles/StyledWrapper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    Swal.fire({
      icon: "success",
      title: "안녕하세요!",
    });
    navigate("/");
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledText>학습자과 교육자을 구분해 로그인 해주세요.</StyledText>
        <StyledBG>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="0" control={<Radio />} label="학습자" />
              <FormControlLabel value="1" control={<Radio />} label="교육자" />
            </RadioGroup>
          </FormControl>

          <div
            style={{
              width: "50%",
              display: "flex",
              flexFlow: "column nowrap",
              gap: "10px",
              paddingBottom: "20px",
            }}
          >
            <TextField id="outlined-basic" label="ID" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
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
  background-position: 80%;
  background-size: 30%;
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
`;

const StyledText = styled.p`
  font-size: 1em;
  font-weight: 500;
  color: gray;
`;
