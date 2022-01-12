const asyncGetCitiesOptions = async (text) => {
  const response = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${text}`
  ).catch(() => "error");

  if (response === "error") return Promise.resolve("error");

  const cities = await response.json();

  return cities;
};

export default asyncGetCitiesOptions;
