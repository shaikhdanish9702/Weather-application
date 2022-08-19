import React, { useState } from 'react';
// import background from './assets/Background.jpg'
const api = {
  key: "2ed4bdce5a8b7687bf44d3f707c4ad07",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const[location ,setlocation]=useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  //  const getUserGeolocationDetails = () => {
  //    fetch(
  //      "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
  //    )
  //      .then(response => response.json())
  //      .then(data => setlocation(data));
  //  };
  // getUserGeolocationDetails();
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    
    <div className='body-background'>
  
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 28) ? 'app warm' : 'app') : 'app'}>
      <main>
          <div className="search-box">
        
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
              </div>
              
        </div>
        ) : ('')}
      </main>
      </div>
      </div>
  );
}

export default App;