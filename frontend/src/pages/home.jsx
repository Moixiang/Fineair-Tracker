import "../home.css";
import { useState, useEffect, useMemo } from "react";
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

  const popularRoutes = useMemo(() => {
    return flights
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
  }, [flights]);

  const fleetBreakdown = useMemo(() => {
    return flights
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
  }, [flights]);

  function formatAltitude(flight) {
    if (flight.status === "LANDED") return "Landed";
    if (flight.status === "SCHEDULED") return "—";
    return flight.altitude
      ? `${flight.altitude.toLocaleString("en-US")} m`
      : "—";
  }

  function formatAltitudeFt(flight) {
    if (flight.status === "LANDED") return "—";
    if (flight.status === "SCHEDULED") return "On ground";
    if (flight.status === "CANCELLED") return "Cancelled";
    return flight.altitudeFt
      ? `${flight.altitudeFt.toLocaleString("en-US")} ft`
      : "—";
  }

  function formatSpeed(flight) {
    if (flight.status !== "AIRBORNE") return "—";
    return flight.speed ? `${flight.speed} km/h` : "—";
  }

  function formatMach(flight) {
    if (flight.status !== "AIRBORNE") return "—";
    return flight.mach ? `M ${flight.mach.toFixed(2)}` : "—";
  }

  const co2Rates = {
    // Gulfstream
    "Gulfstream G650ER": 2100,
    "Gulfstream G650": 2050,
    "Gulfstream G700": 2200,
    "Gulfstream G550": 1900,

    // Bombardier
    "Bombardier Global 7500": 2300,
    "Bombardier Global 6500": 2100,
    "Bombardier Challenger 650": 1600,

    // Dassault — both with and without "Dassault" prefix
    "Dassault Falcon 8X": 1800,
    "Dassault Falcon 7X": 1750,
    "Falcon 8X": 1800,
    "Falcon 7X": 1750,
    "Falcon 2000LXS": 1500,

    // Boeing
    "Boeing BBJ": 3200,
    "Boeing BBJ2": 3400,
    "Boeing BBJ MAX 8": 3000,

    // Airbus
    "Airbus ACJ319": 3100,
    "Airbus ACJ320neo": 2900,

    // Embraer
    "Embraer Praetor 600": 1400,
    "Embraer Legacy 650": 1600,

    // Citation
    "Citation Longitude": 1100,
    "Citation XLS+": 900,
  };

  const defaultCo2Rates = 1800;

  const co2Total = useMemo(() => {
    return flights
      .filter((f) => f.status === "AIRBORNE")
      .reduce((total, flight) => {
        const rate = co2Rates[flight.aircraftType] || defaultCo2Rates;
        return total + rate;
      }, 0);
  }, [flights]);

  const airborneCount = useMemo(() => {
    return flights.filter((f) => f.status === "AIRBORNE").length;
  }, [flights]);

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
                  <span className="flightAltitude">
                    {formatAltitude(flight)}
                  </span>
                  <span className="flightAltitude-ft">
                    {formatAltitudeFt(flight)}
                  </span>
                </td>
                <td className="row">
                  <span className="flightSpeed">{formatSpeed(flight)}</span>
                  <span className="flightMach">{formatMach(flight)}</span>
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
      <section className="co2Emission">
        <div className="co2Eyebrow">ENVIRONMENTAL IMPACT</div>
        <div className="co2Label">Estimated CO₂ emissions today</div>
        <div className="co2Num">
          {co2Total.toLocaleString("en-US")}
          <span className="co2unit">kg CO₂e</span>
        </div>
        <div className="co2Sub">
          CALCULATED FROM {airborneCount} ACTIVE FLIGHTS · UPDATED EVERY 60
          SECONDS <br /> BASED ON AIRCRAFT TYPE, DISTANCE FLOWN AND AVERAGE FUEL
          BURN RATES
        </div>
      </section>
    </div>
  );
}
