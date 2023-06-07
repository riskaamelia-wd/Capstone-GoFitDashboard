import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
// how to use
/*
  const { response, isLoading } = useAxios({
    api: yourAPI,
    method: yourMethod(get,post,put,delete),
    url: yourURL ('/membership'),
  });

*/
const useAxios = ({ api, method, url, data = null, headers, body }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      api[method](url, JSON.parse(headers), JSON.parse(body))
        .then((res) => {
          setResponse(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {}, [api, method, url, data, headers, body]);

  return { response, error, isLoading, fetchData };
};
export default useAxios;
