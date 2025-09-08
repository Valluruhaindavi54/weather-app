 import styles from "./WeatherCard.module.css";

export default function WeatherCard({ data }) {
  if (!data || !data.current_weather) return null;

  const current = data.current_weather;

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Current Weather</h2>
      <p className={styles.cardText}>🌡 Temp: {current.temperature}°C</p>
      <p className={styles.cardText}>💨 Wind: {current.windspeed} km/h</p>
      <p className={styles.cardText}>🧭 Direction: {current.winddirection}°</p>
      <p className={styles.cardText}>⏰ Time: {current.time}</p>
    </div>
  );
}
