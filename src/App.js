import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [ weather, setWeather ] = useState()

  const success = pos =>{
   
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7c823c46d086c4cd3426a5e6bca8215b`)
  .then(res => setWeather(res.data));

  }
  
useEffect(()=>{
  navigator.geolocation.getCurrentPosition(success)
}, [])

let grade = Math.trunc((weather?.main.temp)-273.15)
let Fahrenheit = Math.trunc(((((weather?.main.temp)-273.15)*1.8)+32))   

const [ isCorF, setCorF ] = useState(true)
  

  return (
    <div className="App">

      <div className='card'>
    
        <h2>Wheather App</h2>
      <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
            <button onClick={() => setCorF(!isCorF)}> °F/°C </button>
                {isCorF ?
                  <p>Temp {grade}°C</p>
                  : 
                  <p>Temp {Fahrenheit }°F</p> 
                }
  
        <p>Time {weather?.weather[0].main}</p>
        <p>City {weather?.name} {weather?.sys.country}  </p>   
        
      </div>
          

    </div>
  )
}

export default App;
