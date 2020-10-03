const key = "Ws2ek7LZCvwrtSFlSSYGP6bcYG4J5Hvi";

// Get weather Information
export const getWeather = async (id) => {
  const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(baseUrl + query);
  const data = await response.json();
  return data[0];
};

// search city
export const citySearch = async (city) => {
  const baseUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(baseUrl + query);
  const data = await response.json();
  return data[0];
};

// Get city Information
export const getCity = async (city) => {
  const baseURL =
    "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";

  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(baseURL + query);
  const data = await response.json();

  return data;
};