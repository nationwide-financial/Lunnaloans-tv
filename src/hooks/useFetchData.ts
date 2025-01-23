import { useState, useEffect } from "react";
import axios from "axios";

interface UseFetchDataProps<T> {
  url: string;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  params?: Record<string, string | number>;
  interval?: number; // Optional interval in milliseconds
}

interface UseFetchDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = <T>({
  url,
  headers = {},
  method = "GET",
  body,
  params,
  interval = 60000, // Default to 1 minute
}: UseFetchDataProps<T>): UseFetchDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Track component mounted state
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios<T>({
          method,
          url,
          headers,
          data: body,
          params,
        });
        if (isMounted) {
          setData(response.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "An error occurred while fetching data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Set up polling
    const intervalId = setInterval(fetchData, interval);

    // Cleanup function
    return () => {
      isMounted = false; // Mark component as unmounted
      clearInterval(intervalId); // Clear interval
    };
  }, [url, method, body, params, interval]); // Dependencies include interval and other props

  return { data, loading, error };
};

export default useFetchData;
