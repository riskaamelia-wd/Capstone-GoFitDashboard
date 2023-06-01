import { useState, useEffect } from "react";
// how to use
/*
  const { response, isLoading } = useAxios({
    api: yourAPI,
    method: yourMethod(get,post,put,delete),
    url: yourURL ('/membership),
  });

*/
export default function useAxios({ api, method, url, data = null }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api[method](url)
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
  }, [api, method, url, data]);

  return { response, error, isLoading };
}
