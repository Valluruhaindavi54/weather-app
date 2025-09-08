 import styles from "./ForecastCard.module.css";

export default function ForecastCard({ data }) {
  const date = new Date(data.date);

  return (
    <div className={styles.card}>
      <p className={styles.date}>{date.toDateString()}</p>
      <p className={styles.desc}>🌡 Max: {Math.round(data.temp_max)}°C</p>
      <p className={styles.desc}>🌡 Min: {Math.round(data.temp_min)}°C</p>
      <p className={styles.desc}>💧 Precipitation: {data.precipitation} mm</p>
    </div>
  );
}
