const asyncGetFiveDaysForecast = async (cityKey) => {
  const response = await fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
  ).catch(() => "error");

  if (response === "error") return Promise.resolve("error");

  const forecast = await response.json();

  return forecast.DailyForecasts;
};

export default asyncGetFiveDaysForecast;
