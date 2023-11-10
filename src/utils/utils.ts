import * as dayjs from "dayjs";

export const toCamelCase = (str : string) : string => {
  if(!str) return ""
  return str.split(" ")
  .map(
    (n) =>
      n.slice(0, 1).toUpperCase() +
      n.slice(1, n.length + 1).toLowerCase()
  )
  .join(" ")
}

export const formatTime = (time: number) => {
  if (!time) return;
  const hours = Math.floor(time)
  const mins = ( time - hours) *60
  return `${hours > 12 ? hours - 12 : hours}:${mins < 10 ? "0" + mins : mins} ${
    hours < 12 ? "AM" : "PM"
  }`;
};


export const getUpcomingDates = (numUpcomingDates : number) => {
  const currentDate = dayjs();
  const upcomingDates = [currentDate];
  while (upcomingDates.length < numUpcomingDates) {
    const nextDate = upcomingDates[upcomingDates.length - 1].add(1, "day");
    upcomingDates.push(nextDate);
  }
  return upcomingDates;
};

export const generateHourlySlotsBetweenTimes = (
  start: string,
  end: string
): number[] => {
  const allSlots = [];
  let slotStartTime = parseFloat(start);
  const endTime = parseFloat(end);
  const SESSION_DURATION_IN_HOURS = 1.0;
  while (slotStartTime + SESSION_DURATION_IN_HOURS <= endTime) {
    allSlots.push(slotStartTime);
    slotStartTime += SESSION_DURATION_IN_HOURS;
  }
  return allSlots;
};

