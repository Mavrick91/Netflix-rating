const customFetch = (endpoint: string) => {
  return fetch(`https://streaming-availability.p.rapidapi.com/v2${endpoint}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "49f9a941f4mshfa3fccf89e77ff1p1b4c23jsn5ca7f27682af",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  });
};

export default customFetch;
