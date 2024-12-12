import { useState, useEffect } from "react";
import axios from "axios";

interface UseFetchDataProps<T> {
  url: string;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  params?: Record<string, string | number>;
}

interface UseFetchDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = <T>({ url, headers = {}, method = "GET", body, params }: UseFetchDataProps<T>): UseFetchDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          method,
          url,
          headers,
          data: body,
          params,
        });
        console.log("responseresponseresponseresponse",response)
        setData(response.data);
      } catch (err: any) {
        setError(err?.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, params]);

  return { data, loading, error };
};

export default useFetchData;
