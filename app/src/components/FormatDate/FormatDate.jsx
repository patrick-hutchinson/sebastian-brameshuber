const FormatDate = ({ date, locale = "en-US" }) => {
  if (!date) return null;

  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return null;

  const formatted = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <time dateTime={d.toISOString()}>{formatted}</time>;
};

export default FormatDate;
