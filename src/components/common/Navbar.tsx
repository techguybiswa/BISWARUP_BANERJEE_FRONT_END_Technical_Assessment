import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DocsBookLogo from "../../assets/docsbooklogo.webp";
import Grid from "@mui/system/Unstable_Grid";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { StyledLink } from "./StyledLink";
function Navbar() {
  return (
    <div
      style={{
        marginTop: "0px",
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 0px",
        padding: "10px 30px 10px 30px",
      }}
    >
      <Grid container>
        <Grid
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={DocsBookLogo} style={{ width: "70%" }} />
        </Grid>
        <Grid
          xs={3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <StyledLink to="/doctors">
            <Typography
              sx={{
                fontSize: "18px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Find Doctors
            </Typography>{" "}
          </StyledLink>
          <Typography
            sx={{
              fontSize: "18px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Medicines
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: "18px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Lab Tests
          </Typography>{" "}
        </Grid>
        <Grid
          xs={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        ></Grid>
        <Grid
          xs={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#191357",
              borderRadius: "0px",
              boxShadow: "none",
              letterSpacing: "2px",
              textTransform: "none",
            }}
            endIcon={<LocalOfferRoundedIcon />}
          >
            Offers!
          </Button>
        </Grid>
      </Grid>{" "}
    </div>
  );
}
export default Navbar;
