const asyncGetCurrentConditions = async (cityKey) => {
  const response = await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}&details=false`
  ).catch(() => "error");

  if (response === "error") return Promise.resolve("error");

  const forecast = await response.json();

  return forecast[0];
};

export default asyncGetCurrentConditions;
