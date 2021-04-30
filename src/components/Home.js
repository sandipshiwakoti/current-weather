import React, { useState, useRef } from "react";
import { useFetch } from "../useFetch";
import { Link } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const inputEl = useRef(null);
  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputEl.current.value);
  };

  const {
    id,
    name,
    description,
    iconUrl,
    reportDate: date,
    temp,
    country,
  } = data;

  return (
    <section className="section home">
      <h1 className="section-title">Current Weather</h1>
      <div className="section-center">
        <form action="" className="form-search" onSubmit={handleSubmit}>
          <input
            type="text"
            name="input-search"
            id="input-search"
            className="form-control"
            placeholder="enter your city"
            ref={inputEl}
          />
          <button type="submit" className="btn-search btn">
            search
          </button>
        </form>
        {loading && !error && city && (
          <h1 className="section-title">loading...</h1>
        )}
        {!loading && error && city && (
          <h1 className="section-title">not found!</h1>
        )}
        {!loading && !error && (
          <article className="weather-card">
            <div className="weather-header">
              <h2>
                {name} <span>{country}</span>
              </h2>
              <p>{date}</p>
            </div>
            <div className="weather-info">
              <h1>{temp}&deg;C</h1>
              <div className="weather-icon-container">
                <img src={iconUrl} alt={name} className="weather-icon" />
              </div>
              <p>{description}</p>
              <div className="link-container">
                <Link to={`/weather/${id}`} className="btn-more">
                  see more
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default Home;
