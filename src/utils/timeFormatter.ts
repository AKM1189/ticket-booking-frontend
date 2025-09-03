export function minsToHMin(totalMins: number): string {
  const sign = totalMins < 0 ? "-" : "";
  const mins = Math.abs(totalMins);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${sign}${h}h ${m}min` : `${sign}${h}h`;
}
