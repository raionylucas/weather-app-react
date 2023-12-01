import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f482c9a3e64c03554f0ebb6e5530824f`;

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
      <div className='app'>
        <div className='search'>
          <input
            value={location}
            type='text'
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
          />
        </div>
        <div className='container'>
          <div className='top'>
            <div className='lacation'>
              <p>{data.name}</p>
            </div>
            <div className='temp'>
              {data.main ? (
                <h1>{((data.main.temp - 32) / 1.8).toFixed(0)}°C</h1>
              ) : null}
            </div>
            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name != undefined && (
            <div className='bottom'>
              <div className='feels'>
                <p className='bold'>
                  {((data.main.temp - 32) / 1.8).toFixed(0)}°C
                </p>
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                {data.main ? (
                  <p className='bold'>{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.wind ? (
                  <p className='bold'>{data.wind.speed.toFixed(0)} MPH</p>
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
