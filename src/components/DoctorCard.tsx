import Typography from "@mui/material/Typography";

import Grid from "@mui/system/Unstable_Grid";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { toCamelCase } from "../utils/utils";
import { Doctor } from "../utils/constants";
import styled from "styled-components";

interface DoctorCardProps {
  doctor: Doctor;
  imageUrl: string;
}
const CardContainer = styled("div")`
  border: 1px solid #f1f2f4;
  border-radius: 5px;
  padding: 0.5rem;
`;
const CardImageContainer = styled.div<{ imageUrl: string }>`
  background-image: url(${(props) => props.imageUrl});
  width: 100%;
  border-radius: 5px;
  height: 300px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;
const CardInfoContainer = styled("div")`
  margin-top: 10px;
  border-radius: 5px;
  background-color: #fafafa;
  padding: 20px;
  display: flex;
`;
const InfoTypography = styled(Typography)`
  font-weight: 600 !important;
  font-size: 14px !important;
`;
const InfoTypographySpan = styled("span")`
  display: block;
  font-size: 12px;
  color: #6b7b8a;
  font-weight: 400;
`;
function DoctorCard(props: DoctorCardProps) {
  const { doctor, imageUrl } = props;
  return (
    <CardContainer>
      <CardImageContainer imageUrl={imageUrl} />
      <Typography
        sx={{
          fontWeight: "500",
          marginTop: "7px",
          fontSize: "18px",
        }}
      >
        {toCamelCase(doctor.name)}
      </Typography>
      <Grid container style={{ marginTop: "10px" }} spacing={2}>
        <Grid xs={1}>
          <WorkOutlineRoundedIcon style={{ fontSize: "16px" }} />
        </Grid>
        <Grid xs={11}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#384853",
            }}
          >
            MBBS, MD - Medicine, DM - Cardiology Cardiologist,Interventional
            Cardiologist
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid xs={1}>
          <LocalActivityIcon
            style={{
              fontSize: "18px",
              color: "rgb(255, 194, 0)",
            }}
          />
        </Grid>
        <Grid xs={11}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "18px",
              color: "#384853",
            }}
          >
            Highly Rated!
          </Typography>
        </Grid>
      </Grid>
      <CardInfoContainer>
        <Grid xs={8}>
          <InfoTypography>
            {" "}
            <InfoTypographySpan>District</InfoTypographySpan>
            {doctor.address.district}
          </InfoTypography>
        </Grid>{" "}
        <Grid xs={4}>
          <InfoTypography>
            {" "}
            <InfoTypographySpan>Experience</InfoTypographySpan>
            10 years
          </InfoTypography>
        </Grid>{" "}
      </CardInfoContainer>
    </CardContainer>
  );
}
export default DoctorCard;
