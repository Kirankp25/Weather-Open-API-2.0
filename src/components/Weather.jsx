import React, { useState } from 'react';
import './Weather.css'; // import the CSS file
import Background from './Background'; // import the animated background component

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dfa7f16b9e65edade884a65c7ce691bb`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        setWeather(data);
        setError(null);
      })
      .catch(error => {
        console.log(error);
        setWeather(null);
        setError('City not found');
      });
  };

  return (
    <div>
      <Background /> {/* add the animated background component */}
      <div className="weather-container">
        <form onSubmit={handleSubmit}>
          <label>
            Enter city name:
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
          </label>
          <button type="submit">Get Weather</button>
        </form>
        {error && <p className="error">{error}</p>}
        {weather ? (
          <div>
            <h1>{weather.name}, {weather.sys.country}</h1>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Description: {weather.weather[0].description}</p>
          </div>
        ) : (
          <p className="loading">Please enter a city name</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
