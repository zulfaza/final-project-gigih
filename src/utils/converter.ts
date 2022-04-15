function msToFormatedDuration(milisecond: number): string {
  let finalStr = '';
  let seconds = milisecond / 1000;

  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) finalStr += `${minutes > 9 ? minutes : `0${minutes}`}:`;

  const hours = Math.floor(seconds / 3600);
  if (hours > 0) finalStr += `${hours > 9 ? hours : `0${hours}`}:`;
  seconds = seconds % 3600;

  seconds = Math.floor(seconds % 60);
  finalStr += seconds > 9 ? seconds.toString() : `0${seconds}`;
  return finalStr;
}

export { msToFormatedDuration };
