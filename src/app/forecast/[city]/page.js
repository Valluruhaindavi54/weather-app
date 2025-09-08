 "use client";
import { useEffect, useState } from "react";
import ForecastCard from "../../components/ForecastCard";
import styles from "./page.module.css";

export default function ForecastPage() {
  const [forecast, setForecast] = useState([]);
  const [page, setPage] = useState(0); // current page
  const itemsPerPage = 5; // show 5 days per page

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );
        const data = await res.json();
        setForecast(data.daily); // array of daily data
      } catch (error) {
        console.error("Error fetching forecast", error);
      }
    };

    fetchForecast();
  }, []);

  // Calculate the slice of days to display
  const startIndex = page * itemsPerPage;
  const currentSlice = forecast.time?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handleNext = () => {
    if (startIndex + itemsPerPage < forecast.time?.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Forecast</h2>

      <div className={styles.grid}>
        {currentSlice.map((date, idx) => (
          <ForecastCard
            key={date}
            data={{
              date,
              temp_max: forecast.temperature_2m_max[idx + startIndex],
              temp_min: forecast.temperature_2m_min[idx + startIndex],
              precipitation: forecast.precipitation_sum[idx + startIndex],
            }}
          />
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={handleBack} className={styles.navBtn}>
          🔙 Back
        </button>
        <button onClick={handlePrev} disabled={page === 0} className={styles.navBtn}>
          ⬅ Previous
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= forecast.time?.length}
          className={styles.navBtn}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
