const customFetch = (endpoint: string) => {
  if (!process.env.RAPID_API_KEY || !process.env.RAPID_API_HOST) {
    throw new Error(
        "RAPID_API_KEY and RAPID_API_HOST environment variables are required"
    );
  }

  const headers = new Headers();
  headers.append("X-RapidAPI-Key", process.env.RAPID_API_KEY);
  headers.append("X-RapidAPI-Host", process.env.RAPID_API_HOST);

  return fetch(`https://streaming-availability.p.rapidapi.com/v2${endpoint}`, {
    method: "GET",
    headers,
  });
};

export default customFetch;
