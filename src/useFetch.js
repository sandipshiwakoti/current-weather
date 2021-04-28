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
      if (type === "city_name") {
        const {
          id,
          weather,
          name,
          dt,
          main: { temp },
          sys: { country },
        } = responsedData;
        const [elem] = weather;
        const { description, icon } = elem;
        let newDate = new Date(dt * 1000);
        newDate = date.format(newDate, "hh:mm A, MMM DD");
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        setData({ id, name, description, iconUrl, newDate, temp, country });
      } else if (type === "city_id") {
        console.log("hi");
      }
      setLoading(false);
      setError(false);
    } catch (err) {
      console.clear();
      setLoading(false);
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);
  return { data, loading, error };
};
