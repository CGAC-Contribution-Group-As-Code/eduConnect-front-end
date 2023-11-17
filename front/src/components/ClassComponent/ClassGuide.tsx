import { useState, useRef } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { GoMilestone } from "react-icons/go";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import { useQuery } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import { GuideContent } from "./GuideContent";
import { BiError } from "react-icons/bi";

interface MileStone {
  _id: string;
  name: string;
  desc: string;
  last_modify: string;
}

export const ClassGuide = () => {
  const [make, setMake] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<string>("");
  const room_id = decodeURI(window.location.pathname).split("/").at(-2);
  const {
    data: milestone_data,
    isLoading,
    isError,
  } = useQuery<MileStone[], Error>({
    queryKey: ["milestonList", room_id],
    queryFn: async () => {
      const response = await axios.get<MileStone[]>(
        "http://localhost:8000/milestone",
        { params: { room_id: room_id } }
      );
      return response.data;
    },
  });

  const onCloseHandler = () => {
    setIsOpen("");
  };

  const openHandler = (id: string) => {
    setIsOpen(id);
  };

  return (
    <StyledContainer>
      {isOpen === "" ? (
        <>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <StyledRow>
              <GoMilestone size={22} color={theme.navy} />
              <p style={{ fontWeight: "600", color: `${theme.navy}` }}>
                Milestone
              </p>
            </StyledRow>

            {make === false ? (
              <StyledRow
                style={{ cursor: "pointer" }}
                onClick={() => setMake(true)}
              >
                <p>이정표 생성하기</p>
                <AiOutlinePlusCircle size={20} color={theme.navy} />
              </StyledRow>
            ) : (
              <StyledRow
                style={{ cursor: "pointer" }}
                onClick={() => setMake(false)}
              >
                <p>닫기</p>
                <AiOutlineCloseCircle size={20} color="red" />
              </StyledRow>
            )}
          </div>

          {make === false ? (
            <StyledDiv>
              <Milestone
                openHandler={openHandler}
                milestone_data={milestone_data}
              />
            </StyledDiv>
          ) : (
            <CreateMilestone setMake={() => setMake(false)}></CreateMilestone>
          )}
        </>
      ) : (
        <>
          <GuideContent mile_id={isOpen} onCloseHandler={onCloseHandler} />
        </>
      )}
    </StyledContainer>
  );
};

// 각 이정표

type Props = {
  openHandler: (id: string) => void;
  milestone_data: MileStone[] | undefined;
};

const Milestone = ({ openHandler, milestone_data }: Props) => {
  console.log(milestone_data);

  if (milestone_data !== undefined || milestone_data!.length > 0) {
    return (
      <>
        {milestone_data!.map((milestone) => {
          return (
            <StyledBox
              key={milestone._id}
              onClick={() => openHandler(milestone._id)}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "600", fontSize: "1.1em" }}>
                  {milestone.name}
                </p>

                <p style={{ fontSize: "0.9em", color: "gray" }}>
                  {new Date(milestone.last_modify).toDateString()}
                </p>
              </div>

              <p style={{ color: "gray", fontSize: "0.9em" }}>
                {milestone.desc}
              </p>
            </StyledBox>
          );
        })}
      </>
    );
  } else {
    return (
      <StyledNone>
        <BiError size={25} color="red" />
        <p style={{ fontWeight: "600", fontSize: "1.2em" }}>
          이정표를 생성해주세요
        </p>
      </StyledNone>
    );
  }
};

// 이정표 만들기

interface Offprops {
  setMake: (e: boolean) => void;
}

interface MakeMilestone {
  name: string;
  desc: string;
}

const CreateMilestone = ({ setMake }: Offprops) => {
  const mileName = useRef<HTMLInputElement>(null);
  const descName = useRef<HTMLInputElement>(null);
  const room_id = decodeURI(window.location.pathname).split("/").at(-2);

  const CreateMile = async (data: MakeMilestone) => {
    console.log(data);
    const { data: response } = await axios.post(
      `http://localhost:8000/milestone/`,
      data,
      { params: { room_id: room_id } }
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(CreateMile, {
    onSuccess: (data) => {
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "${data.name} 이정표가 생성되었습니다",
      });
    },
    onError: () => {
      console.log("error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["milestonList", room_id]);
    },
  });

  const onSubmit = () => {
    const nameMile = mileName.current!.value;
    const descMile = descName.current!.value;

    const data = {
      name: nameMile,
      desc: descMile,
    };
    console.log(data);

    mutate(data);
    setMake(false);
  };

  return (
    <div style={{ display: "flex", flexFlow: "column nowrap", gap: "15px" }}>
      <TextField
        id="standard-basic"
        color="primary"
        label="이정표 이름"
        variant="standard"
        style={{ width: "50%" }}
        inputRef={mileName}
      />

      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        color="primary"
        label="간단한 설명"
        style={{ width: "80%", fontFamily: "HealthsetGothicLight" }}
        inputRef={descName}
      />

      <p
        style={{
          fontWeight: "600",
          width: "fit-content",
          alignSelf: "end",
          cursor: "pointer",
        }}
        id="makeMilestone"
        onClick={() => onSubmit()}
      >
        생성하기!
      </p>
    </div>
  );
};

// const StyledDnd = styled.div`
//   height: "120px";
//   position: "relative";
//   border-radius: 15px;
//   border: 1px dotted gray;
//   padding: 1em;
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   justify-content: center;
// `;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

const StyledBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 1em;
  border-radius: 15px;
  background-color: aliceblue;
  cursor: pointer;
  gap: 20px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0.5em;
`;

const StyledNone = styled.div`
  grid-column: 1/3;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  width: 100%;
  height: 350px;
  justify-content: center;
  align-items: center;
`;
