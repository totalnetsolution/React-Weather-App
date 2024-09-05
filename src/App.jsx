import React, { useState } from "react";
import axios from "axios";

const API_KEY = "b4db485d7c4c485fa6d84351232508&q"; // Replace with your actual API key

const App = () => {
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState("");

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=b4db485d7c4c485fa6d84351232508&q=${city}&aqi=no`
      );
      // Adding new city data at the top of the list
      setCities((prevCities) => [response.data, ...prevCities]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      fetchWeather(cityInput);
      setCityInput("");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-5">
      <h1 className="text-center text-3xl font-bold mb-6">Weather App</h1>

      <form onSubmit={handleAddCity} className="text-center mb-6">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name"
          className="input input-bordered input-primary w-full max-w-xs mb-4"
        />
        <button type="submit" className="btn btn-primary">
          Add City
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city, index) => (
          <div key={index} className="card shadow-lg bg-base-100 p-5">
            <h2 className="card-title text-xl font-bold">{city.location.name}</h2>
            <img
              src={city.current.condition.icon}
              alt={city.current.condition.text}
              className="w-16 h-16 mx-auto"
            />
            <p className="text-lg">Temperature: {city.current.temp_c}°C</p>
            <p>Weather: {city.current.condition.text}</p>
            <p>Humidity: {city.current.humidity}%</p>
            <p>Wind Speed: {city.current.wind_kph} kph</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
