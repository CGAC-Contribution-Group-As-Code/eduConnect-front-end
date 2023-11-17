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

interface MileStone {
  _id: string;
  name: string;
  desc: string;
  last_modify: string;
}

export const ClassGuide = () => {
  const [make, setMake] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<number>(0);
  const {
    data: milestone_data,
    isLoading,
    isError,
  } = useQuery<MileStone[], Error>({
    queryKey: "milestonList",
    queryFn: async () => {
      const response = await axios.get<MileStone[]>(
        "http://localhost:8000/milestone"
      );
      return response.data;
    },
  });

  const onCloseHandler = () => {
    setIsOpen(0);
  };

  const openHandler = (id: number) => {
    setIsOpen(id);
  };

  return (
    <StyledContainer>
      {isOpen === 0 ? (
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
          <GuideContent id={isOpen} onCloseHandler={onCloseHandler} />
        </>
      )}
    </StyledContainer>
  );
};

// 각 이정표

type Props = {
  openHandler: (id: number) => void;
  milestone_data: MileStone[] | undefined;
};

const Milestone = ({ openHandler, milestone_data }: Props) => {
  if (milestone_data) {
    return (
      <>
        {milestone_data.map((milestone) => {
          return (
            <StyledBox key={milestone._id} onClick={() => openHandler(1)}>
              <p style={{ fontWeight: "600" }}>{milestone.name}</p>
              <p style={{ fontWeight: "600" }}>{milestone.desc}</p>
              <p style={{ fontSize: "0.9em", color: "gray", textAlign: "end" }}>
                {new Date(milestone.last_modify).toDateString()}
              </p>
            </StyledBox>
          );
        })}
      </>
    );
  } else {
    return (
      <StyledBox onClick={() => openHandler(1)}>
        <p style={{ fontWeight: "600" }}>이차방정식과 함수</p>
        <p style={{ fontSize: "0.9em", color: "gray", textAlign: "end" }}>
          2023.11.15
        </p>
      </StyledBox>
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

  const CreateMile = async (data: MakeMilestone) => {
    console.log(data);
    const { data: response } = await axios.post(
      `http://localhost:8000/milestone/`,
      data
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
      queryClient.invalidateQueries("milestonList");
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
  gap: 10px;
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
