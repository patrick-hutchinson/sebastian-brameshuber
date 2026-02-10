import { mediaAssetFragment } from "./fragments";

export const siteQuery = `*[_type=="site"][0]{
  title,
  owner,
  site,
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
  featuredScreenings[]->{
    film->{
      title,
      fullTitle,
    },
    festival,
    "cinema": showtimes[0].cinema
  },
  awards[]->{
    award,
    year,
    film->{
      title,
      fullTitle,
      slug
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

export const newsQuery = `*[_type == "news"]{
  _id,
  _type,
  text,
  date,
  category,
  author,
  publication,
  showtimes,
  film->{
    title,
    slug,
  },
  link,
  previewMedia[0] ${mediaAssetFragment}
}`;

export const publicationsQuery = `*[_type == "publication"]{
  _id,
  _type,
  title,
  text,
  media[0] ${mediaAssetFragment},
  link,
}`;
