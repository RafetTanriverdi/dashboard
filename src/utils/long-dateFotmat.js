import dayjs from "dayjs";

export const longDateFormat = (date) => {
  return dayjs(date).format("MMMM DD, YYYY - hh:mm A");
};
