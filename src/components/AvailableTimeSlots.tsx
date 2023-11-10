import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";

import Grid from "@mui/system/Unstable_Grid";
import { useEffect, useState } from "react";
import { formatTime, generateHourlySlotsBetweenTimes } from "../utils/utils";
import {
  ApiResponse,
  BookingDetails,
  Doctor,
  OpeningHours,
  RequestType,
} from "../utils/constants";
import useFetch from "../hooks/useFetch";
import LoadingSkeleton from "./LoadingSkeleton";

interface AvailableTimeSlotsProps {
  selectedDate: Dayjs;
  selectedDoctor: Doctor;
  selectedTimeSlot: number;
  setSelectedTimeSlot: (selectedTimeSlot: number) => void;
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
  const [allTimeSlots, setAllTimeSlots] = useState<number[]>();
  const {
    selectedDate,
    selectedDoctor,
    selectedTimeSlot,
    setSelectedTimeSlot,
  } = props;
  const {
    request: getAllBookingDetails,
    data: allBookingDetails,
    loading: loadingAllBookingDetails,
    error,
  }: ApiResponse<BookingDetails[]> = useFetch({
    endpoint: "booking",
    requestType: RequestType.GET,
  });
  useEffect(() => {
    getAllBookingDetails();
  }, []);
  useEffect(() => {
    if (allBookingDetails) {
      const slotsAlreadyBooked = allBookingDetails
        .filter(
          (b) =>
            b.doctorId === selectedDoctor.id &&
            b.date === dayjs(selectedDate).format("YYYY-MM-DD")
        )
        .map((b) => b.start);

      const allSlots = getAllSlotsFromDate(
        selectedDate,
        selectedDoctor.opening_hours
      );
      if (allSlots) {
        const allAvailableSlots = allSlots.filter(
          (s) => slotsAlreadyBooked.indexOf(s) == -1
        );
        setAllTimeSlots(allAvailableSlots);
        setSelectedTimeSlot(allAvailableSlots[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, allBookingDetails]);
  return (
    <>
      {" "}
      <Grid container style={{ marginTop: "0", minWidth: "550px" }} spacing={2}>
        {loadingAllBookingDetails && (
          <LoadingSkeleton height="550px" width="100px" />
        )}
        {error && <p>Error fetching booking details</p>}
        {allTimeSlots?.map((s) => (
          <>
            {" "}
            <Grid xs={4} onClick={() => setSelectedTimeSlot(s)} key={s}>
              <div
                style={{
                  color: "#0a243f",
                  border:
                    selectedTimeSlot === s
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
          </>
        ))}
      </Grid>
    </>
  );
}
export default AvailableTimeSlots;
