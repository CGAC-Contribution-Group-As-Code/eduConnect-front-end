import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="headerBody">
        <img
          src="./image/logo.png"
          alt="logo"
          width="150px"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <p
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", fontSize: "1.2em", fontWeight: "600" }}
        >
          Login
        </p>
      </div>
    </div>
  );
};
