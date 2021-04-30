import { useState, useEffect, useCallback } from "react";
import date from "date-and-time";

export const useFetch = (url, type) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const responsedData = await response.json();
      if (responsedData.cod === "400") {
        throw new Error();
      }
      if (type === "current_report") {
        const {
          id,
          weather,
          name,
          dt,
          main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
          sys: { country, sunrise, sunset },
          visibility,
          wind: { speed },
          coord: { lon, lat },
          clouds: { all },
        } = responsedData;
        const [elem] = weather;
        const { description, icon } = elem;

        let reportDate = new Date(dt * 1000);
        reportDate = date.format(reportDate, "hh:mm A, MMM DD");
        let reportTime = new Date(dt * 1000);
        reportTime = date.format(reportTime, "hh:mm A");

        let sunriseTime = new Date(sunrise * 1000);
        sunriseTime = date.format(sunriseTime, "hh:mm A");
        let sunsetTime = new Date(sunset * 1000);
        sunsetTime = date.format(sunsetTime, "hh:mm A");

        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        const finalData = {
          id,
          name,
          description,
          iconUrl,
          reportDate,
          reportTime,
          temp,
          country,
          feels_like,
          temp_min,
          temp_max,
          pressure,
          humidity,
          sunriseTime,
          sunsetTime,
          visibility,
          speed,
          lon,
          lat,
          all,
        };
        setData(finalData);
      }
      setLoading(false);
      setError(false);
    } catch (err) {
      console.clear();
      setLoading(false);
      setError(true);
    }
  }, [url, type]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);
  return { data, loading, error };
};
