import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Screening from "../../components/Screenings/Screening";
import ScreeningContainer from "@/components/Screenings/components/ScreeningConainer";
import Section from "../../components/Structure/Section";

const ScreeningsPage = ({ screenings }) => {
  console.log(screenings[1].showtimes[0].screeningDate, "screening");
  const sortedScreenings = screenings.sort((a, b) => {
    const aDate = a.showtimes[0]?.screeningDate?.startDate ? new Date(a.showtimes[0].screeningDate.startDate) : 0;
    const bDate = b.showtimes[0]?.screeningDate?.startDate ? new Date(b.showtimes[0].screeningDate.startDate) : 0;
    return bDate - aDate;
  });

  return (
    <main>
      <Section>
        <ScreeningContainer>
          {sortedScreenings.map((screening) => {
            return <Screening key={screening._id} screening={screening} />;
          })}
        </ScreeningContainer>
      </Section>
      <ScrollToTop />
    </main>
  );
};

export default ScreeningsPage;
