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
  featuredScreenings[]{
    _key,
    _id,
    _type,
    film->{
      title,
      fullTitle,
      slug,
      showOnHomePage,
    },
    location,
    screeningDate,
    annotation,
    festival,
    showtimes,
  },
  awards[]->{
    award,
    year,
    film->{
      title,
      fullTitle,
      slug,
      showOnHomePage
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
  link,
}`;

export const filmsQuery = `*[_type == "film"]{
  _id,
  _type,
  title,
  fullTitle,
  description,
  coverMedia[0] ${mediaAssetFragment},
  credits,
  festivals,
  comments[]->{
    title,
    text,
    source,
    author,
    link,
  },
  supportingMedia[] ${mediaAssetFragment},
  purchaseLink,
  platform,
  gallery[] ${mediaAssetFragment},
  interviews[]->{
    title,
    subtitle,
    interviewer,
    interviewee,
    interviewText[]{
      _type,
      _key,

      speaker,
      initials,
      text[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            type,
            url,
            internalLink->{
              slug
            }
          }
        }
      },

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
    annotation,
    festival,
    showtimes,
  },
  reviews[]->{
    author,
    publication,
    text,
  },
  showOnHomePage,
  slug
}`;

export const newsQuery = `*[_type == "news"]{
  _id,
  _type,
   text[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            type,
            url,
            internalLink->{
              slug
            }
          }
        }
      },
  date,
  newsCategory->{
    name,
  },
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
