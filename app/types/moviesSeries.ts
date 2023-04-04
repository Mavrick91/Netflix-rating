export type MoviesSeries = {
  type: string;
  title: string;
  overview: string;
  streamingInfo: {
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
        leaving: 0;
      }[];
    };
  };
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
  backdropURLs: {
    "300": string;
    "780": string;
    "1280": string;
    original: string;
  };
  genres: [
    {
      id: number;
      name: string;
    },
    {
      id: number;
      name: string;
    }
  ];
  originalLanguage: string;
  countries: string[];
  directors: string[];
  runtime: number;
  youtubeTrailerVideoId: string;
  youtubeTrailerVideoLink: string;
  posterPath: string;
  posterURLs: {
    "92": string;
    "154": string;
    "185": string;
    "342": string;
    "500": string;
    "780": string;
    original: string;
  };
  tagline: string;
};
