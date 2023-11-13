import { Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { getUpcomingDates } from "../../utils/utils";
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";
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
  const DateBox = styled("div")`
    height: 75px;
    width: 70px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
  `;
  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
      }}
    >
      {upcomingDates?.map((d, index) => (
        <DateBox
          key={index}
          onClick={() => setSelectedDate(upcomingDates[index])}
          style={{
            border:
              selectedDate && dayjs(selectedDate).isSame(d, "day")
                ? "1px solid #131313"
                : "1px solid #e3e6ea",
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
              fontSize: "12px",
            }}
          >
            {dayjs().isSame(dayjs(d), "day")
              ? "Today"
              : dayjs().add(1, "day").isSame(dayjs(d), "day")
              ? "Tomorrow"
              : dayjs(d).format("D MMM")}
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "10px",
              color: "#30d158",
            }}
          >
            Available
          </Typography>
        </DateBox>
      ))}

      {viewAllDatesComponent}
    </div>
  );
}

export default UpcomingDates;
