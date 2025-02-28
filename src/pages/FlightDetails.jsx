import React, { useEffect } from 'react'

const FlightDetails = () => {

  const getFlightDetails = async () => {
    const url = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=19.242218017578125&lng=72.85846156046128&locale=en-US';
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
		    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
	    }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  }
  
  useEffect(() =>{
    getFlightDetails()
  })

  return (
    <div>
      
    </div>
  )
}

export default FlightDetails
