import dayjs from "dayjs";

export const shortDateFormat = (date) => {
  return dayjs(date).format("MMM DD, YYYY");
};
