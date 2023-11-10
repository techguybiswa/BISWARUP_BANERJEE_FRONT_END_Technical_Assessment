import { Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { getUpcomingDates } from "../utils/utils";
import dayjs, { Dayjs } from "dayjs";
import BookingDialog from "./BookingDialog";
interface UpcomingDatesProps {
  selectedDate: Dayjs | undefined;
  setSelectedDate: (selectedDate: Dayjs) => void;
  viewAllDatesComponent?: ReactNode;
}
function UpcomingDates(props: UpcomingDatesProps) {
  const [upcomingDates, setUpcomingDates] = useState<Dayjs[]>();
  const { selectedDate, setSelectedDate, viewAllDatesComponent } = props;
  useEffect(() => {
    const NUM_UPCOMING_DATES = 5;
    setUpcomingDates(getUpcomingDates(NUM_UPCOMING_DATES));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      {upcomingDates?.map((d, index) => (
        <div
          onClick={() => setSelectedDate(upcomingDates[index])}
          style={{
            border:
              selectedDate && dayjs(selectedDate).isSame(d, "day")
                ? "1px solid #131313"
                : "1px solid #e3e6ea",

            height: "75px",
            width: "70px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "12px",
              color: "#384853",
            }}
          >
            {dayjs(d).format("ddd")}
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {dayjs(d).format("D MMM")}
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "10px",
              color: "#30d158",
            }}
          >
            2 slots
          </Typography>
        </div>
      ))}

      {viewAllDatesComponent}
    </div>
  );
}

export default UpcomingDates;
