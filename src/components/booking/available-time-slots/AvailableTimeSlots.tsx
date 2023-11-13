import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import Grid from "@mui/system/Unstable_Grid";
import { ReactNode, useEffect, useState } from "react";
import {
  formatTime,
  generateHourlySlotsBetweenTimes,
  getDateTimeOfSelectedSlot,
} from "../../../utils/utils";
import {
  ApiResponse,
  BookingDetails,
  ConfirmedBookingDetails,
  OpeningHours,
  RequestType,
} from "../../../utils/constants";
import useFetch from "../../../hooks/useFetch";
import LoadingSkeleton from "../../common/LoadingSkeleton";
import AvailableTimeSlotsConfirmationButton from "./AvailableTimeSlotsConfirmationButton";
import AvailableTimeSlotsHeader from "./AvailableTimeSlotsHeader";

interface AvailableTimeSlotsProps {
  header?: ReactNode;
  bookingDetails: BookingDetails;
  setSelectedTimeSlot: (selectedTimeSlot: number) => void;
  confirmationButton?: ReactNode;
}

const getAllSlotsFromDate = (
  date: Dayjs,
  openingHours: OpeningHours[] | null
): number[] | null => {
  if (!openingHours) return null;
  const dayOfTheWeek = dayjs(date).format("ddd").toUpperCase();
  const specificDayOpeningHours = openingHours.filter(
    (h) => h.day === dayOfTheWeek
  );
  const slots: number[][] = specificDayOpeningHours.map(({ start, end }) =>
    generateHourlySlotsBetweenTimes(start, end)
  );
  // we are using map and filter in order to support the use case where the same "day" has multiple different start and end.
  // for example: [{start: 6, end: 13, isClosed: false, day: 'MON'}, {start: 20, end: 22, isClosed: false, day: 'MON'}]
  // in this above example 'MON' has a non continous opening_hours
  return ([] as number[]).concat(...slots);
};
function AvailableTimeSlots(props: AvailableTimeSlotsProps) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<number[]>();
  const { bookingDetails, setSelectedTimeSlot, confirmationButton, header } =
    props;
  const { selectedDate, selectedTime } = bookingDetails;

  const {
    request: getAllConfirmedBookingDetails,
    data: allConfirmedBookings,
    loading: loadingAllBookingDetails,
    error,
  }: ApiResponse<ConfirmedBookingDetails[]> = useFetch({
    endpoint: "booking",
    requestType: RequestType.GET,
  });

  useEffect(() => {
    getAllConfirmedBookingDetails();
  }, []);

  useEffect(() => {
    if (allConfirmedBookings) {
      const { selectedDate, selectedDoctor } = bookingDetails;
      const allSlots: number[] =
        getAllSlotsFromDate(selectedDate, selectedDoctor.opening_hours) ?? [];
      const slotsAlreadyBooked = allConfirmedBookings
        .filter(
          (b) =>
            b.doctorId === selectedDoctor.id &&
            b.date === dayjs(selectedDate).format("YYYY-MM-DD")
        )
        .map((b) => b.start);
      const currentDateTime = dayjs();
      if (allSlots) {
        const allAvailableSlots = allSlots.filter(
          (s) =>
            slotsAlreadyBooked.indexOf(s) == -1 &&
            getDateTimeOfSelectedSlot(selectedDate, s).isAfter(
              currentDateTime,
              "minutes"
            )
        );
        setAvailableTimeSlots(allAvailableSlots);
        setSelectedTimeSlot(allAvailableSlots[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, allConfirmedBookings]);

  if (loadingAllBookingDetails)
    return <LoadingSkeleton height="550px" width="100px" />;

  if (error) return <p>Error fetching booking details</p>;

  return (
    <>
      {" "}
      {header}
      <Grid
        container
        style={{ marginTop: "10px", minWidth: "550px" }}
        spacing={2}
      >
        {availableTimeSlots?.length ? (
          availableTimeSlots.map((s) => (
            <Grid xs={4} onClick={() => setSelectedTimeSlot(s)} key={s}>
              <div
                style={{
                  color: "#0a243f",
                  border:
                    selectedTime === s
                      ? "1px solid #131313"
                      : "1px solid #e3e6ea",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Typography style={{ fontSize: "16px", fontWeight: "500" }}>
                  {formatTime(s)}
                </Typography>
              </div>
            </Grid>
          ))
        ) : (
          <Typography>
            Sorry, no more slots available today. Please select a different
            date.
          </Typography>
        )}
      </Grid>
      {!!availableTimeSlots?.length && confirmationButton}
    </>
  );
}

AvailableTimeSlots.Button = AvailableTimeSlotsConfirmationButton;
AvailableTimeSlots.Heading = AvailableTimeSlotsHeader;

export default AvailableTimeSlots;
