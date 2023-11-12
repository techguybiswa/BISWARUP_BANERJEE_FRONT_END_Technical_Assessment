import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import { Doctor, Steps } from "../../utils/constants";
import AvailableTimeSlots from "./AvailableTimeSlots";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ConfirmBooking from "./ConfirmBooking";

interface ViewAllDatesDialogProps {
  handleClose: () => void;
  viewAllDates: boolean;
  doctor: Doctor;
}

function GetStep(
  step: Steps,
  setCurrentStep: (step: Steps) => void,
  doctor: Doctor
) {
  const [dateValue, setDateValue] = useState<Dayjs>(dayjs());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(0);

  switch (step) {
    case Steps.DATE_SELECTION:
      return (
        <>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "16px",
              color: "#131313",
              paddingBottom: "10px",
              borderBottom: "1px solid #dee2e6!important",
            }}
          >
            Select date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue as Dayjs)}
              disablePast={true}
              focusedView={"day"}
              maxDate={dayjs().add(1, "months")}
              views={["day"]}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#05051b",
              ":hover": {
                backgroundColor: "#05051b",
              },
            }}
            onClick={() => setCurrentStep(Steps.TIME_SELECTION)}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "500",
                width: "100%",
              }}
            >
              Continue
            </Typography>
          </Button>
        </>
      );
      break;
    case Steps.TIME_SELECTION:
      return (
        <>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "16px",
              color: "#131313",
              paddingBottom: "10px",
              borderBottom: "1px solid #dee2e6!important",
              marginBottom: " 10px",
            }}
          >
            Select time slot for {dayjs(dateValue).format("DD MMM, ddd")}
          </Typography>
          <AvailableTimeSlots
            selectedDate={dateValue}
            selectedDoctor={doctor ?? null}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
          />
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "#05051b",
              ":hover": {
                backgroundColor: "#05051b",
              },
            }}
            onClick={() => setCurrentStep(Steps.BOOKING_CONFIRMATION)}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "500",
                width: "100%",
              }}
            >
              Confirm Booking
            </Typography>
          </Button>
        </>
      );
      break;
    case Steps.BOOKING_CONFIRMATION:
      return (
        <>
          <ConfirmBooking
            bookingDetails={{
              date: dateValue,
              time: selectedTimeSlot,
              doctor: doctor,
            }}
          />
        </>
      );
      break;
  }
}

function ViewAllDatesDialog(props: ViewAllDatesDialogProps) {
  const { viewAllDates, handleClose, doctor } = props;
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.DATE_SELECTION);
  const StepComponent = GetStep(currentStep, setCurrentStep, doctor);
  return (
    <>
      <Dialog open={viewAllDates} onClose={handleClose}>
        <DialogContent>{StepComponent}</DialogContent>
      </Dialog>
    </>
  );
}
export default ViewAllDatesDialog;
