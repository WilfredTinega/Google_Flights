import React from 'react'
import FlightDetails from './pages/FlightDetails'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<FlightDetails/>}/>
        <Route path='/' element= {<FlightDetails/>}/>
        <Route path='/' element= {<FlightDetails/>}/>
        <Route path='/' element= {<FlightDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
