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
    festivals,
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
  },
  teaching[]{
    text
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
  showtimes[]{
    ...,
    link{
      type,
      url,
      internalLink->{
        _type,
        slug
      }
    }
  },
  link{
    type,
    url,
    internalLink->{
      _type,
      slug
    }
  },
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
    link{
      type,
      url,
      internalLink->{
        _type,
        slug
      }
    },
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
              _type,
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
    showtimes[]{
      ...,
      link{
        type,
        url,
        internalLink->{
          _type,
          slug
        }
      }
    },
    link{
      type,
      url,
      internalLink->{
        _type,
        slug
      }
    },
  },
  "awards": *[_type == "award" && film._ref == ^._id]{
    award,
    year,
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
              _type,
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
  link{
    type,
    url,
    internalLink->{
      _type,
      slug
    }
  },
  previewMedia[0] ${mediaAssetFragment}
}`;

export const publicationsQuery = `*[_type == "publication"]{
  _id,
  _type,
  title,
  text,
  excerpts[]{
    title,
    text[]{
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
              _type,
              slug
            }
          }
        }
      },

      style,
      children[]
    }
  },
  media[0] ${mediaAssetFragment},
  link{
    type,
    url,
    internalLink->{
      _type,
      slug
    }
  },
}`;
