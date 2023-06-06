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
export default function useAxios({ api, method, url, data = null, filter }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [debounce, setDebounce] = useDebounce("", 500);
  useEffect(() => {
    if (filter === filter) {
      const fetchData = async () => {
        try {
          api[method](`${url}${filter}`)
            .then((res) => {
              setDebounce(filter);
              setResponse(res.data);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
      // console.log(filter);
    } else {
      const fetchData = async () => {
        try {
          api[method](`${url}`)
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
      fetchData();
    }
  }, [api, method, url, data, setDebounce, filter]);

  return { response, error, isLoading };
}
