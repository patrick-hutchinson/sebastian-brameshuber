import ScreeningContainer from "@/components/Screenings/ScreeningConainer";
import Screening from "@/components/Screenings/Screening";

const FilmScreenings = ({ film }) => {
  if (!film.screenings) return undefined;

  return (
    <ScreeningContainer>
      {film.screenings.map((screening) => (
        <Screening key={screening._id} screening={screening} />
      ))}
    </ScreeningContainer>
  );
};

export default FilmScreenings;
