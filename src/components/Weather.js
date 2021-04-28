import React from "react";
import { Link, useParams } from "react-router-dom";

const Weather = () => {
  return (
    <section className="section weather">
      <div className="section-center">
        <h1 className="section-title">Weather Report</h1>
        <article className="weather-report"></article>
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
