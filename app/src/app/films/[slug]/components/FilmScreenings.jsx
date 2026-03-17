import ScreeningContainer from "@/components/Screenings/components/ScreeningConainer";
import Screening from "@/components/Screenings/Screening";

const FilmScreenings = ({ film }) => {
  if (!film.screenings) return undefined;

  const getStartDate = (screening) => {
    const startDate = screening.showtimes?.[0]?.screeningDate?.startDate;
    if (!startDate) return null;

    const parsedDate = new Date(startDate);
    if (Number.isNaN(parsedDate.getTime())) return null;
    return parsedDate;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const closestScreenings = film.screenings
    .map((screening) => {
      const date = getStartDate(screening);
      return {
        screening,
        distance: date ? Math.abs(date.getTime() - today.getTime()) : Number.POSITIVE_INFINITY,
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5)
    .map((item) => item.screening);

  return (
    <ScreeningContainer>
      {closestScreenings.map((screening) => (
        <Screening key={screening._id} screening={screening} />
      ))}
    </ScreeningContainer>
  );
};

export default FilmScreenings;
