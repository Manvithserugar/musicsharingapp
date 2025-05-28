import axios from "axios";
import { useState, useEffect } from "react";
import { useErrorHandler } from ".";

function useFetch(url, dependencyArray = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { handleError } = useErrorHandler();

  // console.log("hi useFetch reached", url);
  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("hi useFetch reached 2", url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        handleError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...dependencyArray]);

  return { data, loading, error };
}

export default useFetch;
