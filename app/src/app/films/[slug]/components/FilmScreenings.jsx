import ScreeningContainer from "@/components/Screenings/ScreeningConainer";
import Screening from "@/components/Screenings/Screening";

const FilmScreenings = ({ film }) => {
  if (!film.screenings) return undefined;

  const sortedScreenings = film.screenings
    .slice() // copy so we don't mutate
    .sort((a, b) => new Date(a.showtimes[0]?.screeningDate) - new Date(b.showtimes[0]?.screeningDate))
    .slice(0, 10); // limit to first 10

  return (
    <ScreeningContainer>
      {sortedScreenings.map((screening) => (
        <Screening key={screening._id} screening={screening} />
      ))}
    </ScreeningContainer>
  );
};

export default FilmScreenings;
