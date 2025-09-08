 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import styles from "./page.module.css";

// Convert city name to coordinates using Nominatim OpenStreetMap
const getCoordinates = async (city) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
  );
  const data = await res.json();
  if (!data.length) throw new Error("City not found");
  return { latitude: data[0].lat, longitude: data[0].lon };
};

export default function Home() {
  const [weather, setWeather] = useState(null);
  const router = useRouter();

  const fetchWeather = async (city) => {
    try {
      const { latitude, longitude } = await getCoordinates(city);

      // Current weather
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await res.json();

      if (data.current_weather) {
        setWeather({ ...data.current_weather, city });
      } else {
        alert("Weather data not available");
        setWeather(null);
      }
    } catch (error) {
      alert(error.message || "Error fetching weather data");
      setWeather(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌤 Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {weather && (
        <div className={styles.result}>
          <WeatherCard data={weather} />
          <button
            onClick={() =>
              weather?.city && router.push(`/forecast/${weather.city}`)
            }
            className={styles.button}
          >
            View 5-Day Forecast
          </button>
        </div>
      )}
    </div>
  );
}
