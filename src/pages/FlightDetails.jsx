import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FlightDetails() {
  const { id } = useParams();
  const [flightDetails, setFlightDetails] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`https://sky-scrapper.p.rapidapi.com/api/v1/flights/${id}`, {
          headers: {
            'x-rapidapi-key': '437e1f58e9msh668b54ae62de6dfp1adf8ejsnbaf861e8dff3',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          },
        });
        setFlightDetails(response.data);
        console.log('Flight Details:', response.data);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchFlightDetails();
  }, [id]);

  return (
    <div className="flight-details">
      <h1>Flight Details</h1>
      {flightDetails ? (
        <div>
          <p>Flight Number: {flightDetails.flight_number}</p>
          <p>From: {flightDetails.from}</p>
          <p>To: {flightDetails.to}</p>
          <p>Departure: {flightDetails.departure_time}</p>
          <p>Arrival: {flightDetails.arrival_time}</p>
          <p>Price: ${flightDetails.price}</p>
        </div>
      ) : (
        <p>Loading flight details...</p>
      )}
    </div>
  );
}

export default FlightDetails;
