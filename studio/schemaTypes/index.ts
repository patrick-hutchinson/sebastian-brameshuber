import {type SchemaTypeDefinition} from 'sanity'

import {site} from './site'

// Pages
import {index} from './pages/index'
import {about} from './pages/about'

// Types
import {link} from './types/link'
import {page} from './types/page'

import {screening} from './screening'
// import {location} from './location'
import {film} from './film'
import {portableText} from './types/portableText'
import {comment} from './comment'
import {imageAsset} from './types/imageAsset'
import {videoAsset} from './types/videoAsset'
import {interviewText} from './types/interviewText'
import {interview} from './interview'
import {review} from './reviews'
import {mediaAsset} from './types/mediaAsset'
import {gallery} from './types/gallery'
import {award} from './award'
import {news} from './news'
import {publication} from './publication'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    link,
    screening,
    // location,
    page,
    film,
    site,
    index,
    portableText,
    comment,
    imageAsset,
    interviewText,
    videoAsset,
    interview,
    review,
    mediaAsset,
    gallery,
    award,
    about,
    news,
    publication,
  ],
}
