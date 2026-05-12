import ScreeningContainer from "@/components/Screenings/components/ScreeningConainer";
import Screening from "@/components/Screenings/Screening";
import { getScreeningStartTimestamp } from "@/components/Screenings/utils/screeningSort";

const FilmScreenings = ({ film }) => {
  if (!film.screenings) return undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const closestScreenings = film.screenings
    .map((screening) => {
      const timestamp = getScreeningStartTimestamp(screening);
      return {
        screening,
        distance:
          timestamp === Number.NEGATIVE_INFINITY ? Number.POSITIVE_INFINITY : Math.abs(timestamp - today.getTime()),
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
