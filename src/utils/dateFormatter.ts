import dayjs from "dayjs";

export const formatDate = (date: dayjs.Dayjs) => {
  const now = dayjs();
  const seconds = now.diff(date, "second");
  const minutes = now.diff(date, "minute");
  const hours = now.diff(date, "hour");
  const days = now.diff(date, "day");
  const months = now.diff(date, "month");
  const years = now.diff(date, "year");

  if (seconds < 60) return `now`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
};
