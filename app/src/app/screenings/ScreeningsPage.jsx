import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Screening from "../../components/Screenings/Screening";
import ScreeningContainer from "@/components/Screenings/components/ScreeningConainer";
import Section from "../../components/Structure/Section";
import { sortScreeningsNewestFirst } from "@/components/Screenings/utils/screeningSort";

const ScreeningsPage = ({ screenings }) => {
  const sortedScreenings = sortScreeningsNewestFirst(screenings);

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
