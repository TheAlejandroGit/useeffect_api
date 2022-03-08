import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";

function App() {

const [weather, setWeather]=useState({});
const [temperature,setTemperature]=useState(0);
const [isFh, setIsFh]= useState(false);


const success=pos=>{

const latitude= pos.coords.latitude;
const longitude=pos.coords.longitude;
  
axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=24707f74ce4469cea3264d85915485e1`)

.then(res=> {
  setWeather(res.data)
  setTemperature(res.data.main.temp);



});

}

const convertTemp=()=>{
if(isFh){
  setTemperature(((temperature-32) *5)/9 );
  setIsFh(false);

  } else {
    setTemperature((1.8)*temperature+32);
    setIsFh(true);
  }

}

useEffect(()=>{

  navigator.geolocation.getCurrentPosition(success);

},[]);



  return (
    <div className="App">
<div className='weatherCard'>
<h1>Weather App</h1>
  {weather.weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt=""/> :null}
  
  <ul>
    <li><b> {weather.name}, {weather.sys?.country}</b></li>
    <li> <b> {Math.round(temperature)} {isFh ? "Fº" :"Cº"}</b> </li>
    </ul>
    <button onClick={convertTemp}>Convert to {isFh ? "Celcius" :"Farenheight"}</button>
  </div>
  </div>
  );
}

export default App;
