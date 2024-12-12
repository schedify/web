import moment from "moment";

export function formatTime(time: Date | string | number | null) {
  if (!time) return "";
  return moment(time).fromNow();
}

export function formatDate(time: Date | string | number | null) {
  if (!time) return "";
  return moment(time).format("MMMM Do YYYY, h:mm:ss a");
}
