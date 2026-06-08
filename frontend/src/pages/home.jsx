import "../home.css";
import { useState, useEffect } from "react";
import flightsData from "../TestData/flights.json";

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

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch(`${API_BASE}/flights/live`);
        const data = await res.json();
        setFlights(data);
      } catch (err) {
        setFlights(flightsData); // falls back to local JSON
      }
    };
    fetchFlights();
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
            <span className="tableTitle">Right now, in the air.</span>
          </div>
          <div className="tableHeaderRight">
            <ul>
              <li>
                <a href="">View all →</a>
              </li>
            </ul>
          </div>
        </div>
        <table className="flightTable">
          <thead>
            <tr className="tableRowHeader">
              <th>AIRCRAFT</th>
              <th>ROUTE</th>
              <th>ALTITUDE</th>
              <th>SPEED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {flights.slice(0, 4).map((flight) => (
              <tr key={flight.id}>
                <td className="row">
                  <span className="flightCallsign">{flight.callsign}</span>
                  <span className="flightType">{flight.aircraftType}</span>
                </td>
                <td className="row">
                  <span className="flightRoute">
                    <span className="flightAirport">{flight.from}</span>
                    <span className="flightArrow"> → </span>
                    <span className="flightAirport">{flight.to}</span>
                  </span>
                  <span className="flightCities">
                    {flight.fromCity} — {flight.toCity}
                  </span>
                </td>
                <td className="row">
                  <span className="flightAltitude">{flight.altitude}</span>
                  <span className="flightAltitude-ft">{flight.altitudeFt}</span>
                </td>
                <td className="row">
                  <span className="flightSpeed">{flight.speed}</span>
                  <span className="flightMach">{flight.mach}</span>
                </td>
                <td>
                  <span
                    className={`flight-status flight-status--${flight.status.toLowerCase()}`}
                  >
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
