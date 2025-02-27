import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  const [from, setFrom] = useState(''); // Origin input (City, Country, Airport)
  const [to, setTo] = useState(''); // Destination input (City, Country, Airport)
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Flight Search Made Easy');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Example API response data
    const apiResponse = {
      "legs": [
        {
          "origin": {
            "city": "London",
            "country": "United Kingdom",
            "name": "London Heathrow"
          },
          "destination": {
            "city": "New York",
            "country": "United States",
            "name": "New York John F. Kennedy"
          },
          "departure": "2025-02-06T15:50:00",
          "arrival": "2025-02-06T18:50:00",
          "durationInMinutes": 480,
          "price": {
            "formatted": "$3,264"
          }
        },
        {
          "origin": {
            "city": "New York",
            "country": "United States",
            "name": "New York John F. Kennedy"
          },
          "destination": {
            "city": "London",
            "country": "United Kingdom",
            "name": "London Heathrow"
          },
          "departure": "2025-02-06T22:30:00",
            "arrival": "2025-02-07T10:30:00",
            "durationInMinutes": 420,
            "price": {
              "formatted": "$3,264"
            }
          }
      ]
    };

    try {
      // Here we would normally make an API call, but using static response for now
      // const response = await axios.request(options);

      const filteredFlights = apiResponse.legs.filter((flight) => {
        // Check if origin and destination match the inputs
        const originMatches =
          flight.origin.city.toLowerCase().includes(from.toLowerCase()) ||
          flight.origin.country.toLowerCase().includes(from.toLowerCase()) ||
          flight.origin.name.toLowerCase().includes(from.toLowerCase());

        const destinationMatches =
          flight.destination.city.toLowerCase().includes(to.toLowerCase()) ||
          flight.destination.country.toLowerCase().includes(to.toLowerCase()) ||
          flight.destination.name.toLowerCase().includes(to.toLowerCase());

        return originMatches && destinationMatches;
      });

      if (filteredFlights.length > 0) {
        setFlights(filteredFlights);
        setMessage(''); // Clear initial message when flights are found
      } else {
        setFlights([]);
        setMessage('No Flights Found');
      }

      setLoading(false); // Set loading state to false after the API call
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setLoading(false);
      setMessage('Error fetching flight data');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Flight Search</h2>
      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="sm:w-1/2 mb-4 sm:mb-0">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              From (Origin)
            </label>
            <input
              type="text"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="City, Country, Airport"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:w-1/2">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              To (Destination)
            </label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="City, Country, Airport"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="sm:w-1/2 mb-4 sm:mb-0">
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:w-1/2">
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search Flights
        </button>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div className="mt-8 bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold text-gray-800">Loading...</p>
        </div>
      )}

      {/* Message if no results */}
      {!loading && !flights.length && (
        <div className="mt-8 bg-red-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold text-red-800">{message}</p>
        </div>
      )}

      {/* Displaying the flight results */}
      {flights.length > 0 && !loading && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center mb-4">Available Flights</h3>
          <div className="space-y-4">
            {flights.map((flight, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-lg shadow-md">
                <h4 className="font-semibold">{flight.origin.name} to {flight.destination.name}</h4>
                <p className="text-sm text-gray-600">Departure: {new Date(flight.departure).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Arrival: {new Date(flight.arrival).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Duration: {Math.floor(flight.durationInMinutes / 60)}h {flight.durationInMinutes % 60}m</p>
                <p className="font-bold text-indigo-600">{flight.price.formatted}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
