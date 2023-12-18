import hotbg from "./assets/hot.jpg";
import coldbg from "./assets/cold.jpg";
import { useEffect, useState } from "react";

import Description from "./components/Description";
import "./index.css";
import { getWeatherData } from "./weather";

const App = () => {
  // ! Below by default we are setting the city to paris
  const [city, setCity] = useState("Paris");

  // ! Below we are changing the weather condition
  const [weather, setweather] = useState(null);

  // ! Below we are setting the units
  const [units, setUnits] = useState("metric");

  // ! Below we are dynamically changing the background images for hot and cold condition
  const [bg, setBg] = useState(hotbg);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city, units);
      console.log(data);
      setweather(data);

      // ! Dynamic background change
      // ! Below if the degree is below 20 degree then it will be cold or else it will be hot
      const climates = units === "metric" ? 20 : 60;
      // ! Below data we are geeting from API
      if (data.temp <= climates) setBg(coldbg);
      else setBg(hotbg);
    };

    fetchData();
  }, [units, city]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";

    // ! Metric means which is in celcius and imperial is in farenite
    setUnits(isCelcius ? "metric" : "imperial");
  };

  const keyPressed = (e) => {
    if (e.keyCode === 13) setCity(e.currentTarget.value);
    // ! Focus will be disabled on the input field if we
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {/* Below we have given the condition that if the weather exist then only the data should be displayed */}
        {weather && (
          <div className="container">
            <div className="section section_inputs">
              <input
                onKeyDown={keyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button
                title="Click on the button to convert from farenite to celcius "
                onClick={(e) => handleClick(e)}
              >
                °F
              </button>
            </div>
            <div className="section section__temperature">
              <div className="icons">
                <h3>{`${weather.name}, ${weather.country}`}</h3>

                <img
                  src={weather.iconURL}
                  alt="weather icon"
                  height={"60px"}
                  width={"70px"}
                />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} ${
                  units === "metric" ? "°F" : "°C"
                }`}</h1>
              </div>
            </div>

            {/* We have passed description component in app.jsx components to get the data passed into it */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
