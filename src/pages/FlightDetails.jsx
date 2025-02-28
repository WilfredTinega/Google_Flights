import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';

const FlightDetails = () => {

  const [nearByAirports, setNearByAirports] = useState([]);
  const inputRef = useRef([]);

  const Flights = async (place) => {
    try {
      const location = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
      const locationData = await location.json();
      const latitude = locationData[0].lat;
      const longitude = locationData[0].lon;

        const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${latitude}&lng=${longitude}&locale=en-US`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
          }
        };

      const responseFlights = await fetch(url, options);
      const dataflights = await responseFlights.json();
      console.log(dataflights)

      setNearByAirports(
        dataflights.data.nearby
      )
      
    } catch (error) {
      console.log("Error", error)
      
    }
  }

  useEffect(() =>{
    Flights("nairobi")
  },[])

  return (
    <div>
      <div className='m-2 flex items-center gap-2 '>
        <input
          className='border '
          ref = {inputRef}
          type="text" placeholder='From...' required />
        <span
          onClick={()=>Flights(inputRef.current.value)}
          className='border bg-amber-300 p-0.5 cursor-pointer'>submit</span>
      </div>

      <div>
        {
        nearByAirports.length < 0 ? (
          <div>loading...</div>
        ):(

          <table>
            <thead>
              <tr>
                <th className='border text-center px-1'>Airport</th>
                <th className='border text-center px-1'>country</th>
                <th className='border text-center px-1'>Flight Details</th>
              </tr>
            </thead>
            <tbody>
              {
                nearByAirports.map((airport, index)=> (
                  <tr key={index}>
                    <td className='border px-1'>{airport.presentation.suggestionTitle }</td>
                    <td className='border px-1'>{airport.presentation.subtitle}</td>
                    <td className='border px-1 text-center'><a href="#" className='text-green-600'>Details</a></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
        }
        
      </div>
    </div>
    
  )
}

export default FlightDetails
