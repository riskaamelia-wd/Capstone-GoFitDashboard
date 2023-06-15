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

const useAxios = ({ api, method, url, body }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api[method.toLowerCase()](url, JSON.parse(body))
          .then((res) => {
            setResponse(res.data);
          })

          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        // setError(err);
        console.log(err);
      }
    };
    fetchData();
  }, [api, body, method, url]);

  return { response, error, isLoading };
};
export default useAxios;
