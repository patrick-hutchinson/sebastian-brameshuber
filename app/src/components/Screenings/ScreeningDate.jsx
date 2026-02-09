const ScreeningDate = ({ date }) => {
  if (!date) return null;

  const { startDate, startTime, endDate, endTime } = date;
  if (!startDate) return null;

  // Combine date + optional time
  const parseDateTime = (d, t) => {
    if (!d) return null;
    const timePart = t ? t : "00:00";
    return new Date(`${d}T${timePart}`);
  };

  const start = parseDateTime(startDate, startTime);
  const end = parseDateTime(endDate, endTime);

  // Format date only: February 17, 2026
  const formatDate = (d) => d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  // Format time manually: 12pm, 9.45pm
  const formatTime = (d) => {
    if (!d) return "";
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    if (minutes === 0) {
      return `${hours}${ampm}`;
    } else {
      return `${hours}.${minutes.toString().padStart(2, "0")}${ampm}`;
    }
  };

  // Combine date + optional time
  const format = (d) => {
    if (!d) return "";
    const datePart = formatDate(d);
    const timePart = formatTime(d);
    return timePart ? `${datePart}, ${timePart}` : datePart;
  };

  // Only start
  if (start && !endDate) {
    return <time dateTime={start.toISOString()}>{format(start)}</time>;
  }

  // Range
  if (start && end) {
    return (
      <>
        <time dateTime={start.toISOString()}>{format(start)}</time> – <time dateTime={end.toISOString()}>{format(end)}</time>
      </>
    );
  }

  return null;
};

export default ScreeningDate;
