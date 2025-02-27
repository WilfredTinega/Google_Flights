import React from 'react';
import { useLocation } from 'react-router-dom';

function AvailableFlights() {
  const { state } = useLocation();
  const { flights } = state || { flights: [] }; // Default to empty if no flights found

  return (
    <div className="available-flights">
      <h1>Available Flights</h1>
      {flights.length === 0 ? (
        <p>No flights available for your search.</p>
      ) : (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              <p>Flight: {flight.flight_number}</p>
              <p>From: {flight.from}</p>
              <p>To: {flight.to}</p>
              <p>Departure: {flight.departure_time}</p>
              <p>Arrival: {flight.arrival_time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AvailableFlights;
