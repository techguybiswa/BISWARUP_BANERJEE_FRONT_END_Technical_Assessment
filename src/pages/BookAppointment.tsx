import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import AvailableTimeSlots from "../components/AvailableTimeSlots";
import { ApiResponse, Doctor, RequestType } from "../utils/constants";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ViewAllDatesDialog from "../components/BookingDialog";
import ConfirmBooking from "../components/ConfirmBooking";
import Layout from "../layout/layout";
import useFetch from "../hooks/useFetch";
import DoctorProfile from "../components/DoctorProfile";
import LoadingSkeleton from "../components/LoadingSkeleton";
import UpcomingDates from "../components/UpcomingDates";
import ViewAllDates from "../components/ViewAllDates";

function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>();
  const [viewAllDates, setViewAllDates] = useState<boolean>(false);
  const [showBookingConfirmation, setShowBookingConfirmation] =
    useState<boolean>(false);
  const { id: doctorId } = useParams();
  const handleClose = () => {
    setViewAllDates(false);
  };
  const {
    request: getDoctorDetails,
    data: doctor,
    loading,
    error,
  }: ApiResponse<Doctor> = useFetch({
    endpoint: "doctor/" + doctorId,
    requestType: RequestType.GET,
  });

  useEffect(() => {
    getDoctorDetails();
  }, []);

  useEffect(() => {
    setShowBookingConfirmation(false);
  }, [selectedDate, selectedTimeSlot, viewAllDates]);
  const SelectDateHeader = () => {
    return (
      <>
        {" "}
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Available sessions
        </Typography>
        <Typography
          sx={{
            fontWeight: "300",
            fontSize: "12px",
            color: "#384853",
          }}
        >
          Book 1:1 sessions from the options based on your needs
        </Typography>
      </>
    );
  };
  const ConfirmBookingButton = () => {
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
            onClick={() => setShowBookingConfirmation(true)}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "500",
                width: "100%",
              }}
            >
              Book Session for {dayjs(selectedDate).format("DD MMM YYYY")}{" "}
            </Typography>
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Layout heading="Book Appointment">
        <div style={{ marginTop: "50px", marginBottom: "100px" }}>
          {loading && <LoadingSkeleton />}
          {error && <p>Error while loading doctor profile</p>}
          {doctor && (
            <>
              <DoctorProfile doctor={doctor} />
              <Grid container spacing={2}>
                <Grid xs={12} md={3} style={{ marginTop: "50px" }}></Grid>
                <Grid xs={12} md={6} style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      border: "solid 1px #e3e6ea",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <>
                      {" "}
                      <SelectDateHeader />
                      <UpcomingDates
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        viewAllDatesComponent={
                          <ViewAllDates setViewAllDates={setViewAllDates} />
                        }
                      />
                    </>
                    {selectedDate && (
                      <div
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            color: "#131313",
                            paddingBottom: "20px",
                            borderBottom: "1px solid #dee2e6!important",
                          }}
                        >
                          Available time slots
                        </Typography>
                        <div style={{ marginTop: "10px" }}>
                          <AvailableTimeSlots
                            selectedDate={selectedDate}
                            selectedTimeSlot={selectedTimeSlot as number}
                            setSelectedTimeSlot={setSelectedTimeSlot}
                            selectedDoctor={doctor ?? null}
                          />
                        </div>
                        {showBookingConfirmation ? (
                          <div style={{ marginTop: "20px" }}>
                            <ConfirmBooking
                              bookingDetails={{
                                date: selectedDate,
                                time: selectedTimeSlot as number,
                                doctor: doctor,
                              }}
                            />
                          </div>
                        ) : (
                          <ConfirmBookingButton />
                        )}
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
              {viewAllDates && (
                <ViewAllDatesDialog
                  viewAllDates={viewAllDates}
                  handleClose={handleClose}
                  doctor={doctor}
                />
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
export default BookAppointment;
