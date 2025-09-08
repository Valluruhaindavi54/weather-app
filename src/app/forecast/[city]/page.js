 "use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ForecastCard from "../../components/ForecastCard";
import styles from "./page.module.css";

const getCoordinates = async (city) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
  );
  const data = await res.json();
  if (!data.length) throw new Error("City not found");
  return { latitude: data[0].lat, longitude: data[0].lon };
};

export default function ForecastPage() {
  const { city } = useParams();
  const router = useRouter();
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const { latitude, longitude } = await getCoordinates(city);

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );
        const data = await res.json();

        if (data.daily) {
          // Transform the data to array of objects for ForecastCard
          const daily = data.daily.time.map((date, i) => ({
            date,
            temp_max: data.daily.temperature_2m_max[i],
            temp_min: data.daily.temperature_2m_min[i],
            precipitation: data.daily.precipitation_sum[i],
          }));
          setForecast(daily);
        }
      } catch (error) {
        alert(error.message || "Error fetching forecast");
      }
    };
    fetchForecast();
  }, [city]);

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/")} className={styles.backBtn}>
        ⬅ Back
      </button>

      <h2 className={styles.title}>5-Day Forecast for {city}</h2>

      <div className={styles.grid}>
        {forecast.map((day) => (
          <ForecastCard key={day.date} data={day} />
        ))}
      </div>
    </div>
  );
}
