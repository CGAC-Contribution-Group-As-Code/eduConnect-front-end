import React from "react";
import { AiFillGithub, AiFillYoutube } from "react-icons/ai";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footerBody">
        <div className="footerTxt">
          <div
            className="icons"
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              gap: "20px",
              marginBottom: "10px",
            }}
          >
            <AiFillGithub
              color="navy"
              size={30}
              title="GitHub으로 이동"
              style={{ cursor: "pointer" }}
            />

            <AiFillYoutube
              color="red"
              size={30}
              title="시연 영상 확인"
              style={{ cursor: "pointer" }}
            />
          </div>

          <p style={{ fontWeight: "600", fontSize: "1.2em" }}>
            CGAC : Contrubution Group As Code
          </p>
          <p style={{ fontSize: "1em" }}>Contact : ancx1234@naver.com</p>
          <p style={{ fontSize: "0.9em" }}>
            CBNU Department of Computer Science
          </p>
        </div>

        <img src="/image/logo.png" alt="logo" width="220px" />
      </div>
    </div>
  );
};
