import { useEffect, useState } from 'react';
import './App.css';
import Cards from './Components/Cards/Cards';
import CountryPicker from './Components/CountryPicker/CountryPicker';
import Graphs from './Components/Graphs/Graphs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer/Footer';
function App() {

  const apiURL='https://covid19.mathdro.id/api'
  const [data,setData]=useState([])


  async function fetchData() {
    const response= await fetch(apiURL);
    const fetchedData = await response.json()
    setData( fetchedData)
    
  }


  

  useEffect(()=>{
    fetchData()
    
  },[])

//  Graphs.jsx

const [fetchedCountry, setFetchedCountry]=useState([])



useEffect(()=>{
    async function fetchCountry() {
      const response= await fetch(`${apiURL}/countries`);
      const fetchedData = await response.json()
      setFetchedCountry( fetchedData)
    }
    fetchCountry()
    
  },[])

// Graphs.jsx End

 function SubmitHandler(params) {
    console.log(params);
    setSelectedCountry(params)
}

  const {confirmed , recovered , deaths , lastUpdate} = data;
  const [selectedCountry,setSelectedCountry]=useState('')

  return (
    <div className="App">
      <div className="header-div">
      <p>{new Date(Date.now()).toDateString()}</p>
      <div className="header">
      <img src="/covid-tracker.png" alt="" />
      <h1>covid tracker</h1>
      </div>
      </div>
      <Cards confirmed={confirmed} recovered={recovered} deaths={deaths} lastUpdate={lastUpdate} selectedCountry={selectedCountry}/>
      <CountryPicker countries={fetchedCountry.countries} submitHandler={SubmitHandler}/>
      <Graphs selectedCountry={selectedCountry}/>
      <Footer/>
    </div>
  );
}

export default App;
