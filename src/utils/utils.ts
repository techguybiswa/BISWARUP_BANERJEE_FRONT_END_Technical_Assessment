import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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
  if (!time) return 0;
  const hours = Math.floor(time)
  const mins = ( time - hours) *60
  return `${hours > 12 ? hours - 12 : hours}:${mins < 10 ? "0" + mins : mins} ${
    hours < 12 ? "AM" : "PM"
  }`;
};


export const getUpcomingDates = (numUpcomingDates : number): Dayjs[] => {
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

export const getDateTimeOfSelectedSlot = (selectedDate : Dayjs, selectedTime : number) : Dayjs => dayjs(
  dayjs(selectedDate).format("YYYY MM DD") +
    " " +
    formatTime(selectedTime),
  "YYYY MM DD HH:mm A"
)
export const searchInObjectByKeys = <T>(searchText: string , object : T , keys : (keyof T)[]): boolean=> 
  keys.map(k => JSON.stringify(object[k]).toLowerCase().includes(searchText.toLowerCase())).some(val => val)
