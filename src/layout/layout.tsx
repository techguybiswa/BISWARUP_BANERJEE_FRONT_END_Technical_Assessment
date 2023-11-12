import { ReactNode } from "react";
import Navbar from "../components/common/Navbar";
import Typography from "@mui/material/Typography";
import { styled } from "styled-components";
interface LayoutProps {
  children: ReactNode;
  heading: string;
}
const LayoutContainer = styled("div")`
  padding: 30px 100px 30px 100px;
  max-width: 1200px;
  margin: auto;
`;
const StyledLayoutHeading = styled(Typography)`
  width: fit-content;
  border-bottom: 2px solid #191357;
`;
export default function Layout(props: LayoutProps) {
  const { heading } = props;
  return (
    <>
      {" "}
      <Navbar />
      <LayoutContainer>
        <StyledLayoutHeading
          sx={{
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          {heading}
        </StyledLayoutHeading>
        {props.children}
      </LayoutContainer>
    </>
  );
}
