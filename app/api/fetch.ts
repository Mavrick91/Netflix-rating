const customFetch = (endpoint: string) => {
  const headers = new Headers();
  headers.append(
    "X-RapidAPI-Key",
    "49f9a941f4mshfa3fccf89e77ff1p1b4c23jsn5ca7f27682af"
  );
  headers.append("X-RapidAPI-Host", "streaming-availability.p.rapidapi.com");

  return fetch(`https://streaming-availability.p.rapidapi.com/v2${endpoint}`, {
    method: "GET",
    headers,
  });
};

export default customFetch;
