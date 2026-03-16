const ScreeningDate = ({ date }) => {
  if (!date) return null;

  const { startDate, startTime, endDate, endTime } = date;
  if (!startDate) return null;
  const hasStartTime = Boolean(startTime);
  const hasEndTime = Boolean(endTime);

  // Combine date + optional time
  const parseDateTime = (d, t) => {
    if (!d) return null;
    return new Date(`${d}T${t || "00:00"}`);
  };

  const start = parseDateTime(startDate, startTime);
  const end = parseDateTime(endDate, endTime);

  // Format date only: February 17, 2026
  const formatDate = (d) => d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  const formatMonthDay = (d) => d.toLocaleDateString("en-US", { day: "numeric", month: "long" });
  const getDay = (d) => d.getDate();
  const getYear = (d) => d.getFullYear();

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
  const format = (d, includeTime) => {
    if (!d) return "";
    const datePart = formatDate(d);
    if (!includeTime) return datePart;
    const timePart = formatTime(d);
    return timePart ? `${datePart}, ${timePart}` : datePart;
  };

  // Only start
  if (start && !endDate) {
    return <time dateTime={hasStartTime ? `${startDate}T${startTime}` : startDate}>{format(start, hasStartTime)}</time>;
  }

  // Range
  if (start && end) {
    if (!hasStartTime && !hasEndTime) {
      const sameDate = startDate === endDate;
      const sameYear = start.getFullYear() === end.getFullYear();
      const sameMonth = sameYear && start.getMonth() === end.getMonth();

      if (sameDate) {
        return <time dateTime={startDate}>{formatDate(start)}</time>;
      }

      if (sameMonth) {
        return (
          <>
            <time dateTime={startDate}>{formatMonthDay(start)}</time>–
            <time dateTime={endDate}>
              {getDay(end)}, {getYear(end)}
            </time>
          </>
        );
      }

      if (sameYear) {
        return (
          <>
            <time dateTime={startDate}>{formatMonthDay(start)}</time>–<time dateTime={endDate}>{formatDate(end)}</time>
          </>
        );
      }
    }

    return (
      <>
        <time dateTime={hasStartTime ? `${startDate}T${startTime}` : startDate}>{format(start, hasStartTime)}</time>–
        <time dateTime={hasEndTime ? `${endDate}T${endTime}` : endDate}>{format(end, hasEndTime)}</time>
      </>
    );
  }

  return null;
};

export default ScreeningDate;
