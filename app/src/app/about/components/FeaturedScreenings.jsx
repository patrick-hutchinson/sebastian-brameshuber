import AnimationLink from "@/components/Animation/AnimationLink";
import Text from "@/components/Text/Text";
import styles from "../AboutPage.module.css";

const FeaturedScreenings = ({ featuredScreenings }) => {
  if (!featuredScreenings || featuredScreenings.length === 0) return null;

  const canLinkFilm = (film) => film?.showOnHomePage === true && Boolean(film?.slug?.current);

  return (
    <ul typo="longcopy">
      <div>Filmography</div>
      {featuredScreenings.map((screening, index) => (
        <li key={screening._key ?? screening._id ?? `${screening.film?.slug?.current ?? "screening"}-${index}`}>
          {canLinkFilm(screening.film) ? (
            <AnimationLink path={`/films/${screening.film.slug.current}`}>
              <div className={styles.filmTitle}>{screening.film?.fullTitle ?? screening.film?.title}</div>
            </AnimationLink>
          ) : (
            <div className={styles.filmTitle}>{screening.film?.fullTitle ?? screening.film?.title}</div>
          )}
          <Text text={screening.festivals} />
        </li>
      ))}
    </ul>
  );
};

export default FeaturedScreenings;
