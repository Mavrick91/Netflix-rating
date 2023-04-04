export type Status = {
  statusCode: number;
  statusText: string;
};

export type Season = {
  type: string;
  title: string;
  overview: string;
  streamingInfo: {
    us: {
      prime: {
        type: string;
        quality: string;
        addOn: string;
        link: string;
        watchLink: string;
        audios: Audios[];
        subtitles: Subtitle[];
        price: Price;
        leaving: number;
      }[];
    };
  };
  cast: [];
  firstAirYear: number;
  lastAirYear: number;
  youtubeTrailerVideoId: string;
  youtubeTrailerVideoLink: string;
  posterPath: string;
  posterURLs: PosterURLs;
  episodes: {
    type: string;
    title: string;
    overview: string;
    streamingInfo: {
      us: {
        prime: {
          type: string;
          quality: string;
          addOn: string;
          link: string;
          watchLink: string;
          audios: Audios[];
          subtitles: Subtitle[];
          price: Price;
          leaving: number;
        }[];
      };
    };
    cast: [];
    year: number;
    directors: string[];
    runtime: number;
    stillPath: string;
    stillURLs: StillURLs;
    imdbId: string;
    imdbRating: number;
    imdbVoteCount: number;
    tmdbRating: number;
    youtubeTrailerVideoId: string;
    youtubeTrailerVideoLink: string;
  }[];
};

export type Audios = {
  language: string;
  region: string;
};

export type Price = {
  amount: string;
  currency: string;
  formatted: string;
};

export type Subtitle = {
  locale: Locale;
  closedCaptions: true;
};

export type Locale = {
  language: string;
  region: string;
};

export type StillURLs = {
  "92": string;
  "185": string;
  "300": string;
  original: string;
};

export type StreamingInfo = {
  [key: string]: {
    [key: string]: {
      type: string;
      quality: string;
      addOn: string;
      link: string;
      watchLink: string;
      audios: null;
      subtitles: null;
      price: null;
      leaving: number;
    }[];
  };
};

export type BackdropURLs = {
  "300": string;
  "780": string;
  "1280": string;
  original: string;
};

export type Genres = {
  id: number;
  name: string;
};

export type PosterURLs = {
  "92": string;
  "154": string;
  "185": string;
  "342": string;
  "500": string;
  "780": string;
  original: string;
};

export type MoviesSeries = {
  firstAirYear: number;
  lastAirYear: number;
  creators: string[];
  status: Status;
  seasonCount: number;
  episodeCount: number;
  seasons: Season[];
  type: string;
  title: string;
  overview: string;
  streamingInfo: StreamingInfo;
  episodeRuntimes: number[];
  cast: string[];
  year: number;
  advisedMinimumAudienceAge: number;
  imdbId: string;
  imdbRating: number;
  imdbVoteCount: number;
  tmdbId: number;
  tmdbRating: number;
  originalTitle: string;
  backdropPath: string;
  backdropURLs: BackdropURLs;
  genres: Genres;
  originalLanguage: string;
  countries: string[];
  directors: string[];
  runtime: number;
  youtubeTrailerVideoId: string;
  youtubeTrailerVideoLink: string;
  posterPath: string;
  posterURLs: PosterURLs;
  tagline: string;
};
