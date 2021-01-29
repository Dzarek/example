import React from "react";
import "./App.css";

const Result = (props) => {
  const {
    // date,
    city,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    country,
    err,
  } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div>
        <h3>
          Informacje pogodowe dla:
          <br />
          <em>
            {city}, {country}
          </em>
        </h3>
        {/* <h4>
          Data i godzina: <span>{date}</span>
        </h4> */}
        <h4 className="temp">
          Aktualna temperatura:
          <br />
          <span>{temp} &#176;C</span>
        </h4>
        <h4>
          Wschód słońca dzisiaj o: <span>{sunriseTime}</span>
        </h4>
        <h4>
          Zachód słońca dzisiaj o: <span>{sunsetTime}</span>
        </h4>
        <h4>
          Ciśnienie: <span>{pressure} hPa</span>
        </h4>
        <h4>
          Prędkość wiatru: <span>{wind} m/s</span>
        </h4>
      </div>
    );
  }

  return <div className="result">{err ? null : content}</div>;
};

export default Result;
