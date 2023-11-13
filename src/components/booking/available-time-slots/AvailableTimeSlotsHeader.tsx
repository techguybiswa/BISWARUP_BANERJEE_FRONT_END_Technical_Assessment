import Typography from "@mui/material/Typography";
interface AvailableTimeSlotsHeaderProps {
  text: string;
}
function AvailableTimeSlotsHeader({ text }: AvailableTimeSlotsHeaderProps) {
  return (
    <>
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          color: "#131313",
          paddingBottom: "10px",
          borderBottom: "1px solid #dee2e6!important",
        }}
      >
        {text}
      </Typography>
    </>
  );
}

export default AvailableTimeSlotsHeader;
