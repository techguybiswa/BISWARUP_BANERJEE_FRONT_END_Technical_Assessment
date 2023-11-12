import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { formatTime } from "../../utils/utils";
import Button from "@mui/material/Button";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import {
  ApiResponse,
  BookingConfirmationResponse,
  BookingStatus,
  Doctor,
  RequestType,
} from "../../utils/constants";
import Alert from "@mui/material/Alert";
interface BookingDetails {
  date: Dayjs;
  time: number;
  doctor: Doctor;
  bookingName?: string;
}
interface ConfirmBookingProps {
  bookingDetails: BookingDetails;
}

function ConfirmBooking(props: ConfirmBookingProps) {
  const { bookingDetails } = props;
  const { date, time, doctor } = bookingDetails;
  const [bookingName, setBookingName] = useState<string>("");

  const confirmedBookingDetails: BookingDetails = {
    date,
    time,
    doctor,
    bookingName,
  };

  const {
    request: confirmAppointment,
    data: bookingConfirmationData,
    loading,
    error,
  }: ApiResponse<BookingConfirmationResponse> = useFetch({
    endpoint: "booking",
    requestType: RequestType.POST,
    body: {
      name: confirmedBookingDetails.bookingName as string,
      start: confirmedBookingDetails.time as number,
      doctorId: confirmedBookingDetails.doctor.id as string,
      date: dayjs(confirmedBookingDetails.date).format("YYYY-MM-DD"),
      status: BookingStatus.CONFIRMED,
    },
  });

  const confirmBooking = () => {
    confirmAppointment();
  };
  const navigate = useNavigate();
  useEffect(() => {
    const navigateToBookingSuccess = () => {
      const bookingSuccessUrl =
        "/booking-success/" + bookingConfirmationData?.id;
      navigate(bookingSuccessUrl);
    };
    if (bookingConfirmationData?.status === BookingStatus.CONFIRMED) {
      navigateToBookingSuccess();
    }
  }, [bookingConfirmationData, navigate]);
  return (
    <>
      {bookingConfirmationData && <h1>{bookingConfirmationData.status}</h1>}

      <Typography
        style={{
          fontWeight: "600",
          fontSize: "18px",
          color: "#131313",
          paddingBottom: "20px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        Confirm your booking
      </Typography>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          {" "}
          <DateRangeIcon />{" "}
          <Typography
            style={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#131313",
            }}
          >
            {dayjs(date).format("DD MMM, ddd")}
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <AccessTimeIcon />{" "}
          <Typography
            style={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#131313",
            }}
          >
            {formatTime(time)}
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <AttachMoneyIcon />{" "}
          <Typography
            style={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#131313",
            }}
          >
            67 USD
          </Typography>
        </div>
      </div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Full Name"
        value={bookingName}
        onChange={(e) => setBookingName(e.target.value)}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#131313",
            },
          },
        }}
      />
      {error && (
        <Alert
          variant="outlined"
          severity="error"
          style={{ marginTop: "20px" }}
        >
          {error && "Invalid Booking. Please select a different date and time."}
        </Alert>
      )}
      <Button
        variant="contained"
        sx={{
          width: "100%",
          backgroundColor: "#077f7f",
          marginTop: "20px",
          ":hover": {
            backgroundColor: "#077f7f",
          },
        }}
        disabled={loading || !bookingName.length}
        onClick={() => confirmBooking()}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "500",
            width: "100%",
          }}
        >
          {loading ? "Confirming..." : "Confirm Booking"}
        </Typography>
      </Button>
    </>
  );
}
export default ConfirmBooking;
