import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
interface AvailableTimeSlotsConfirmationButtonProps {
  buttonText: string;
  onConfirm: () => void;
}
function AvailableTimeSlotsConfirmationButton(
  props: AvailableTimeSlotsConfirmationButtonProps
) {
  return (
    <>
      {" "}
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#05051b",
            ":hover": {
              backgroundColor: "#05051b",
            },
          }}
          onClick={() => props.onConfirm()}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "500",
              width: "100%",
            }}
          >
            {props.buttonText}
          </Typography>
        </Button>
      </div>
    </>
  );
}

export default AvailableTimeSlotsConfirmationButton;
