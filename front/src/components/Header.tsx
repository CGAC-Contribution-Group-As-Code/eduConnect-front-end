import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logoutUser } from "../api/reducers";
import { PiUserCircleLight } from "react-icons/pi";
import styled from "styled-components";
import theme from "../styles/theme";
interface RootState {
  user: {
    id: string;
    role: number;
  };
}

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let state = useSelector((state: RootState) => {
    return state;
  });
  const { user } = state;
  const { id, role } = user;

  const logOut = () => {
    Swal.fire({
      icon: "question",
      title: "로그아웃 하시겠습니까?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logoutUser());
        window.location.href = "http://localhost:3000/";
      }
    });
  };

  return (
    <div className="header">
      <div className="headerBody">
        <img
          src="/image/logo.png"
          alt="logo"
          width="150px"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        {role === -1 ? (
          <p
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", fontSize: "1.2em", fontWeight: "600" }}
          >
            Login
          </p>
        ) : (
          <StyledRow>
            <PiUserCircleLight size={40} color={theme.navy} />
            <p
              style={{
                cursor: "pointer",
                fontSize: "1.2em",
                fontWeight: "600",
              }}
              onClick={() => logOut()}
            >
              {id}
            </p>
          </StyledRow>
        )}
      </div>
    </div>
  );
};

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 6px;
  align-items: center;

  &:hover {
    color: red;
  }
`;
