"use client";

import AnimationLink from "@/components/Animation/AnimationLink";

const FilmsPage = ({ films }) => {
  return (
    <div typo="fineprint">
      <div style={{ marginBottom: "var(--margin-2)", color: "var(--accent)" }}>
        🚧🍿 Diese Seite wird noch entwickelt. Um auf eine Film Unterseite zu kommen, klicke auf einen Link:
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {films.map((film) => (
          <AnimationLink key={film._id} path={`/films/${film.slug.current}`}>
            {film.title}
          </AnimationLink>
        ))}
      </div>
    </div>
  );
};

export default FilmsPage;
