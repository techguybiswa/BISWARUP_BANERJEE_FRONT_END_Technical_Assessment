import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import AvailableTimeSlots from "../components/booking/available-time-slots/AvailableTimeSlots";
import {
  ApiResponse,
  Doctor,
  HttpApiRequest,
  RequestType,
} from "../utils/constants";

import Grid from "@mui/material/Grid";
import ViewAllDatesDialog from "../components/booking/BookingDialog";
import ConfirmBooking from "../components/booking/ConfirmBooking";
import Layout from "../layout/layout";
import useFetch from "../hooks/useFetch";
import DoctorProfile from "../components/doctor/DoctorProfile";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import UpcomingDates from "../components/booking/UpcomingDates";
import ViewAllDates from "../components/booking/ViewAllDates";

function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>();
  const [viewAllDates, setViewAllDates] = useState<boolean>(false);
  const [showBookingConfirmation, setShowBookingConfirmation] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams();

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
    (getDoctorDetails as HttpApiRequest)();
    const shouldShowViewAllDates = searchParams.get("mode") === "view-all";
    setViewAllDates(shouldShowViewAllDates);
  }, []);

  useEffect(() => {
    setShowBookingConfirmation(false);
  }, [selectedDate, selectedTimeSlot, viewAllDates]);
  const goToBookingConfirmation = () => {
    if (selectedDate && selectedTimeSlot) setShowBookingConfirmation(true);
  };
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
          Available Sessions
        </Typography>
        <Typography
          sx={{
            fontWeight: "300",
            fontSize: "12px",
            color: "#384853",
          }}
        >
          Book a slot with your doctor.
        </Typography>
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
                        <div style={{ marginTop: "10px" }}>
                          <AvailableTimeSlots
                            setSelectedTimeSlot={setSelectedTimeSlot}
                            header={
                              <AvailableTimeSlots.Heading text="Available time slots" />
                            }
                            bookingDetails={{
                              selectedDate,
                              selectedTime: selectedTimeSlot as number,
                              selectedDoctor: doctor,
                            }}
                            confirmationButton={
                              !showBookingConfirmation && (
                                <AvailableTimeSlots.Button
                                  buttonText={`Book Session for ${dayjs(
                                    selectedDate
                                  ).format("DD MMM YYYY")}`}
                                  onConfirm={goToBookingConfirmation}
                                />
                              )
                            }
                          />
                        </div>
                        {showBookingConfirmation && (
                          <div
                            style={{
                              marginTop: "20px",
                              paddingTop: "20px",
                            }}
                          >
                            <ConfirmBooking
                              bookingDetails={{
                                selectedDate,
                                selectedTime: selectedTimeSlot as number,
                                selectedDoctor: doctor,
                              }}
                            />
                          </div>
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
