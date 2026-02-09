import { mediaAssetFragment } from "./fragments";

export const siteQuery = `*[_type=="site"][0]{
  title,
  description,
  address,
  email,
  phone,
  socials[]{
    platform,
    link
  },
}`;

export const aboutQuery = `*[_type=="about"][0]{
  aboutText,
  awards[]->{
    award,
    year,
    film->{
      fullTitle,
      slug,
    },
    link
  }
}`;

export const screeningsQuery = `*[_type == "screening"]{
  _id,
  _type,
  film->{
    title,
    slug,
  },
  location,
  screeningDate,
  annotation,
  festival,
  showtimes,
}`;

export const filmsQuery = `*[_type == "film"]{
  _id,
  _type,
  title,
  fullTitle,
  description,
  coverMedia[0] ${mediaAssetFragment},
  credits,
  comments[]->{
    title,
    text,
    source,
    author,
    link,
  },
  supportingMedia[] ${mediaAssetFragment},
  gallery[] ${mediaAssetFragment},
  interview->{
    title,
    subtitle,
    interviewer,
    interviewee,
    interviewText[]{
      _type,
      _key,

      // speech blocks
      speaker,
      initials,
      text[],

      // heading blocks
      style,
      children[]
}
  },
  "screenings": *[_type == "screening" && film._ref == ^._id]{
    _id,
    _type,
    film->{
      title,
      slug,
    },
    location,
    screeningDate,
    showtimes
  },
  reviews[]->{
    author,
    publication,
    text,
  },
  slug
}`;
