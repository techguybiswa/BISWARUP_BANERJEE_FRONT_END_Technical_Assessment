import { Grid, Typography } from "@mui/material";
import CoverPic from "../../assets/coverpic.jpeg";

import { Doctor, mapDoctorIdToImage } from "../../utils/constants";
import { toCamelCase } from "../../utils/utils";
import styled from "styled-components";
const BookAppointmentCover = styled.div<{ imageUrl: string }>`
  width: 100%;
  background-image: url(${(props) => props.imageUrl});
  height: 300px;
  background-size: cover;
  background-position: center;
  -webkit-filter: brightness(50%);
  border-radius: 5px;
`;

const BookAppointmentProfilePhoto = styled.div<{ imageUrl: string }>`
  position: relative;
  border-radius: 50%;
  background-image: url(${(props) => props.imageUrl});
  height: 15rem;
  width: 15rem;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin-top: -80px;
  margin-left: 30px;
  z-index: 99;
  border: 8px solid white;
`;

function DoctorProfile(props: { doctor: Doctor }) {
  const { doctor } = props;
  if (!doctor) return;
  return (
    <div>
      <BookAppointmentCover imageUrl={CoverPic} />
      <Grid container style={{ marginTop: "0" }} spacing={2}>
        <Grid xs={12} md={12} lg={3}>
          {" "}
          <BookAppointmentProfilePhoto
            imageUrl={mapDoctorIdToImage[doctor.id as string]}
          />
        </Grid>
        <Grid xs={6} style={{ paddingTop: "20px" }}>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "32px",
              color: "#384853",
            }}
          >
            {toCamelCase(doctor.name)}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#384853",
            }}
          >
            MBBS, MD - Medicine, DM - Cardiology Cardiologist,Interventional
            Cardiologist at {doctor.address.line_1} ,{doctor.address.line_2} ,{" "}
            {doctor.address.district}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DoctorProfile;
