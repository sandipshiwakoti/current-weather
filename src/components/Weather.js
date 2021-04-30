import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../useFetch";

const Weather = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
    "current_report"
  );

  if (loading) {
    return (
      <section className="section">
        <h1 className="section-title">loading...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h1 className="section-title">something went wrong</h1>
      </section>
    );
  }

  const {
    name,
    description,
    iconUrl,
    reportDate,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    sunriseTime,
    sunsetTime,
    visibility,
    speed,
    all: cloudiness,
  } = data;
  return (
    <section className="section weather">
      <div className="section-center">
        <h1 className="section-title">Weather Report</h1>
        <article className="weather-report">
          <div className="report-header">
            <h1>{reportDate}</h1>
            <h1>{name}</h1>
            <div className="report-icon-container">
              <img src={iconUrl} alt={description} className="report-icon" />
            </div>
          </div>
          <div className="report-details">
            <div>
              <p>Description</p>
              <p> {description}</p>
            </div>
            <div>
              <p>Cloudiness</p>
              <p> {cloudiness}%</p>
            </div>
            <div>
              <p>Temperature</p>
              <p> {temp}&deg;</p>
            </div>
            <div>
              <p>Temperature Feels Like</p>
              <p> {feels_like}&deg;</p>
            </div>
            <div>
              <p>Maximum Temperature</p>
              <p> {temp_max}&deg;</p>
            </div>
            <div>
              <p>Minimum Temperature</p>
              <p> {temp_min}&deg;</p>
            </div>
            <div>
              <p>Visibility</p>
              <p> {visibility / 1000}km</p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p style={{ textTransform: "lowercase" }}> {speed}m/s</p>
            </div>
            <div>
              <p>Pressure</p>
              <p> {pressure}hPa</p>
            </div>
            <div>
              <p>Humidity</p>
              <p> {humidity}%</p>
            </div>
            <div>
              <p>Sunrise</p>
              <p>{sunriseTime}</p>
            </div>
            <div>
              <p>Sunset</p>
              <p>{sunsetTime}</p>
            </div>
          </div>
        </article>
        <div className="link-container">
          <Link to="/" className="btn btn-home">
            back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Weather;
