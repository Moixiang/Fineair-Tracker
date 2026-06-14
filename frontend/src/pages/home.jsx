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
        setFlights(flightsData);
      }
    };
    fetchFlights();
  }, []);

  const popularRoutes = flights
    .reduce((acc, flight) => {
      const route = `${flight.from} → ${flight.to}`;
      const existing = acc.find((r) => r.route === route);
      if (existing) {
        existing.flights += 1;
      } else {
        acc.push({ id: route, route, flights: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => b.flights - a.flights)
    .slice(0, 4);

  const fleetBreakdown = flights
    .reduce((acc, flight) => {
      const existing = acc.find((a) => a.name === flight.aircraftType);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          id: flight.aircraftType,
          name: flight.aircraftType,
          count: 1,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

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
            {flights.slice(0, 5).map((flight) => (
              <tr key={flight.id}>
                <td className="row">
                  <span className="flightCallsign">{flight.callsign}</span>
                  <span className="flightType">{flight.aircraftType}</span>
                </td>
                <td className="row">
                  <span className="flightRoute">
                    <span className="flightAirport">{flight.from}</span>
                    <span className="flightArrow"> ——› </span>
                    {/*<span className="flightArrow"> → </span>*/}
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
      <section className="popularityStats">
        <div className="popularRoutes">
          <span className="routesEyebrow">POPULAR ROUTES</span>
          <span className="popularRoutesHeader">This week</span>
          <div className="popularRoutesList">
            {popularRoutes.map((route) => (
              <div key={route.id} className="popularRoutesRow">
                <span className="popularRoutesRoute">{route.route}</span>
                <span className="popularRoutesCount">
                  {route.flights} flight(s)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="topAircraftTypes">
          <span className="routesEyebrow">TOP AIRCRAFT TYPES</span>
          <span className="popularRoutesHeader">Fleet breakdown</span>
          <div className="popularRoutesList">
            {fleetBreakdown.map((aircraft) => (
              <div key={aircraft.id} className="popularRoutesRow">
                <span className="popularRoutesRoute">{aircraft.name}</span>
                <span className="popularRoutesCount">
                  {aircraft.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
