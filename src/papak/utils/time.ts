export function dateToSeconds(date: Date): number {
  const dateToSecond =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

  return dateToSecond;
}

export function timeToSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
export function secondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}
