import Header from "./components/Header";
import SignIn from "./components/SignIn";
import TravelerList from "./components/TravelerList";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

import './styles/App.css'

function App() {
  const [travelers, setTravelers] = useState([])

  useEffect(() => {
    const getTravelers = async () => {
      const travelersFromServer = await fetchTravelers()
      setTravelers(travelersFromServer)
    }

    getTravelers()
  }, [])

  const fetchTravelers = async () => {
    const res = await fetch('http://localhost:3000/travelers/json')
    const data = await res.json()

    return data
  }

  // const fetchTraveler = async (id) => {
  //   const res = await fetch(`http://localhost:5000/travelers/${id}`)
  //   const data = await res.json()

  //   return data
  // }

  return (
    <div className="App">
      <Header/>
      <SignIn/>
      <TravelerList travelers={travelers}/>
      <Footer/>
    </div>
  );
}

export default App;
