import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "styled-components";

const ViewAllDatesContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ViewAllDates = (props: {
  setViewAllDates: (viewAllDates: boolean) => void;
}) => {
  return (
    <ViewAllDatesContainer>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "12px",
          color: "#077f7f",
          cursor: "pointer",
        }}
        onClick={() => props.setViewAllDates(true)}
      >
        View All{" "}
        <ArrowForwardIosIcon
          style={{
            fontSize: "10px",
            boxSizing: "border-box",
          }}
        />
      </Typography>
    </ViewAllDatesContainer>
  );
};

export default ViewAllDates;
