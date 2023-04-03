const customFetch = {
  apilayer: (url: string) =>
    fetch(`https://api.apilayer.com/unogs${url}`, {
      headers: {
        apikey: "duAJ5onHY4DqNeb3gPHPlRGDopqOoZjj",
      },
    }),
  imdb: (url: string) => fetch(`https://imdb-api.com/API${url}`),
};

export default customFetch;
