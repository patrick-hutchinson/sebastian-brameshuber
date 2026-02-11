import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Screening from "../../components/Screenings/Screening";
import ScreeningContainer from "@/components/Screenings/ScreeningConainer";

const ScreeningsPage = ({ screenings }) => {
  console.log(screenings[1].showtimes[0].screeningDate, "screening");
  const sortedScreenings = screenings.sort((a, b) => {
    const aDate = a.showtimes[0]?.screeningDate?.startDate ? new Date(a.showtimes[0].screeningDate.startDate) : 0;
    const bDate = b.showtimes[0]?.screeningDate?.startDate ? new Date(b.showtimes[0].screeningDate.startDate) : 0;
    return bDate - aDate;
  });

  return (
    <main>
      <ScreeningContainer>
        {sortedScreenings.map((screening) => {
          return <Screening key={screening._id} screening={screening} />;
        })}
      </ScreeningContainer>
      <ScrollToTop />
    </main>
  );
};

export default ScreeningsPage;
