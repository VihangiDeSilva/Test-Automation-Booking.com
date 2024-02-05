import moment from "moment";

export function getDate(currentDate = undefined, numberOfAfterDays = 0) {
  const date = currentDate ? moment(currentDate) : moment();
  const nextDate = date.add(numberOfAfterDays, "days").format("YYYY-MM-DD");
  return nextDate;
}
