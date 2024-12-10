import moment from "moment";

export function formatTime(time: Date | string) {
  return moment(time).fromNow();
}
