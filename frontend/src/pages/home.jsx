import "./home.css";
import { useState, useEffect } from "react";

export const API_BASE = "API";

export default function Home() {
  const [stats, setStats] = useState({
    aircraftTracked: "...",
    airborneNow: "...",
    countriesCovered: "...",
    aircraftTypes: "....",
  });

  useEffect(() => {
    //useEffect kör koden när sidan ladddas.
    const fetchStats = async () => {
      try {
        // Gör det här, om coden failar skriv svaren i catch (err) ut.
        const res = await fetch(`${API_BASE}/stats`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setStats({
          aircraftTracked: "N/A",
          airborneNow: "N/A",
          countriesCovered: "N/A",
          aircraftTypes: "N/A",
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="siteStats">
      <section className="statContainer">
        <div className="statCell">
          <span className="statNumber">
            {stats.aircraftTracked.toLocaleString()}
          </span>
          <span className="statLabel">AIRCRAFT TRACKED</span>
        </div>

        <div className="statCell">
          <span className="statNumber">{stats.airborneNow}</span>
          <span className="statLabel">AIRBORNE RIGHT NOW</span>
        </div>

        <div className="statCell">
          <span className="statNumber">{stats.countriesCovered}</span>
          <span className="statLabel">COUNTRIES COVERED</span>
        </div>

        <div className="statCell">
          <span className="statNumber">{stats.aircraftTypes}</span>
          <span className="statLabel">AIRCRAFT TYPES</span>
        </div>
      </section>

      <section className="liveFlights"></section>
    </div>
  );
}
