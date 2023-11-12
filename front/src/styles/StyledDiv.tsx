// StyledButton.tsx
import styled from "styled-components";
import theme from "./theme";

const StyledDiv = styled.div`
  width: clamp(700px, 90%, 1200px);
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

  /* background-color: ${theme.skyblue}; */
`;
export default StyledDiv;
