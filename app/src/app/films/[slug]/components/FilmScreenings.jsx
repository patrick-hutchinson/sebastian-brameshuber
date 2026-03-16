import ScreeningContainer from "@/components/Screenings/components/ScreeningConainer";
import Screening from "@/components/Screenings/Screening";

const FilmScreenings = ({ film }) => {
  if (!film.screenings) return undefined;

  const sortedScreenings = film.screenings.slice().sort((a, b) => {
    const aDate = a.showtimes?.[0]?.screeningDate?.startDate ? new Date(a.showtimes[0].screeningDate.startDate) : 0;
    const bDate = b.showtimes?.[0]?.screeningDate?.startDate ? new Date(b.showtimes[0].screeningDate.startDate) : 0;
    return bDate - aDate;
  });

  return (
    <ScreeningContainer>
      {sortedScreenings.map((screening) => (
        <Screening key={screening._id} screening={screening} />
      ))}
    </ScreeningContainer>
  );
};

export default FilmScreenings;
