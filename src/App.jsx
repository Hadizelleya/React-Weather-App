import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=143304b5996c0aa0dda6bbb8f0671cae`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <>
      <div className="app">
        <div className="search">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a Location"
            onKeyPress={searchLocation}
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <h2>{data.name}</h2>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name != undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity.toFixed()}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
