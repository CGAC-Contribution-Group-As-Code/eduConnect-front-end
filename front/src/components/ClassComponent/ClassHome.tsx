import React, { useState } from "react";
import styled from "styled-components";
import { TiPin } from "react-icons/ti";
import theme from "../../styles/theme";
import { BsBookmarks } from "react-icons/bs";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";

// 강의실 들어오자마자 보이는 페이지
// 공지사항, 강의자료 등

export interface TypeProps {
  role: number;
  name: string;
}

export const ClassHome = () => {
  return (
    <StyledDiv>
      <StyledNotice>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            gap: "10px",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
            paddingBottom: "10px",
          }}
        >
          <TiPin size={23} color={theme.navy} />
          <p style={{ fontWeight: "600" }}>강의실 공지사항</p>
        </div>

        <li>강의실 내 잡담 금지</li>
        <li>AI Q&A로 저메추 금지</li>
        <li>선생도 사람이다.</li>
      </StyledNotice>

      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `2px solid ${theme.skyblue}`,
          paddingBottom: "15px",
          marginTop: "35px",
        }}
      >
        <StyledRow>
          <BsBookmarks size={23} color={theme.navy} />
          <p style={{ fontWeight: "600" }}>전체 강의자료</p>
        </StyledRow>

        <StyledRow
          style={{
            cursor: "pointer",
          }}
          id="upload"
        >
          {/* 클릭이벤트 -> 내부 페이지 전환 or 업로드 드랍다운 open
          <p>강의자료 업로드</p>
          <MdOutlineBookmarkAdd size={23} color={theme.skyblue} /> */}
        </StyledRow>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "12px",
          margin: "0 1vw",
        }}
      >
        <Paper role={1} name={"강의자료 1.pdf"} />
        <Paper role={0} name={"강의자료 2.hwp"} />
        <Paper role={0} name={"강의자료 2.hwp"} />
        <Paper role={0} name={"강의자료 2.hwp"} />
      </div>
    </StyledDiv>
  );
};

const Paper = ({ role, name }: TypeProps) => {
  const e = role;
  const n = name;

  const deletePaper = () => {
    Swal.fire({
      icon: "warning",
      title: "강의자료를 정말 삭제하시겠습니까?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "삭제 완료했습니다.",
        });
      }
    });
  };
  return (
    <StyledPaper>
      <p style={{ cursor: "pointer" }}>{n}</p>
      {/* 클릭 이벤트 -> 이정표의 강의자료 화면으로 이동 */}
      {e === 1 ? (
        <StyledRow>
          <AiOutlineDownload
            size={23}
            color={theme.navy}
            style={{ cursor: "pointer" }}
            title="내 컴퓨터에 저장"
          />
          <span style={{ width: "10px" }}></span>
          <AiOutlineDelete
            size={23}
            color="red"
            style={{ cursor: "pointer" }}
            title="강의자료 삭제"
            onClick={() => deletePaper()}
          />
        </StyledRow>
      ) : (
        <AiOutlineDownload
          size={23}
          color={theme.navy}
          style={{ cursor: "pointer" }}
          title="내 컴퓨터에 저장"
        />
      )}
    </StyledPaper>
  );
};

const StyledPaper = styled.div`
  /* margin: 0.5em 1vw; */
  border-radius: 15px;
  background-color: #f7f7f7;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

const StyledNotice = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  gap: 10px;
  border-radius: 15px;
  background-color: aliceblue;
  padding: 1em;

  & > li {
    font-family: "HealthsetGothicLight";
    list-style-type: disc;
    margin-left: 30px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  gap: 15px;
`;
