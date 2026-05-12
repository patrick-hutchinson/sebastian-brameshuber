const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const getScreeningStartTimestamp = (screening) => {
  if (screening?.firstShowtimeStart) {
    const timestamp = new Date(screening.firstShowtimeStart).getTime();
    if (!Number.isNaN(timestamp)) return timestamp;
  }

  const screeningDate = screening?.showtimes?.[0]?.screeningDate;
  const startDate = screeningDate?.startDate;
  const startTime = screeningDate?.startTime;

  if (!startDate) return Number.NEGATIVE_INFINITY;

  const normalizedTime =
    typeof startTime === "string" && timePattern.test(startTime) ? startTime : "00:00";
  const timestamp = new Date(`${startDate}T${normalizedTime}:00`).getTime();

  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
};

export const sortScreeningsNewestFirst = (screenings) => {
  return [...screenings].sort(
    (a, b) => getScreeningStartTimestamp(b) - getScreeningStartTimestamp(a),
  );
};
