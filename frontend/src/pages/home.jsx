import "../home.css";
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
    <div className="mainSite">
      <section className="statContainer">
        <div className="statCell">
          <span className="statNumber">{stats.aircraftTracked || "..."}</span>
          <span className="statLabel">AIRCRAFT TRACKED</span>
        </div>

        <div className="statCell">
          <span className="statNumber">{stats.airborneNow || "..."}</span>
          <span className="statLabel">AIRBORNE RIGHT NOW</span>
        </div>

        <div className="statCell">
          <span className="statNumber">{stats.countriesCovered || "..."}</span>
          <span className="statLabel">COUNTRIES COVERED</span>
        </div>

        <div className="statCell">
          <span className="statNumber">{stats.aircraftTypes || "..."}</span>
          <span className="statLabel">AIRCRAFT TYPES</span>
        </div>
      </section>

      <section className="liveFlights">
        <div className="tableHeader">
          <div className="tableHeaderLeft">
            <span className="tableEyebrow">LIVE FLIGHTS</span>
            <span className="tableTitle">
              <h1>Right now, in the air.</h1>
            </span>
          </div>
          <div className="tableHeaderRight">
            <ul>
              <li>
                <a href="">View all →</a>
              </li>
            </ul>
          </div>
        </div>
        <table className="flightTable"></table>
      </section>
    </div>
  );
}
