import { useState, useEffect } from "react";
// how to use
/*
  const { response, isLoading } = useAxios({
    api: yourAPI,
    method: yourMethod(get,post,put,delete),
    url: yourURL ('/membership'),
  });

*/

const useAxios = ({ api, method, url, body, header }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    if (method) {
      api({
        method,
        url,
        data: JSON.parse(body),
      })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (header) {
      api.interceptors.request.use(
        (config) => {
          config.headers = JSON.parse(header);
          return config;
        },
        (error) => {
          console.log(`error intercepter => `, error);
          return Promise.reject(error);
        }
      );
    }
    fetchData();
  }, [api, body, header, method, url]);

  return { response, error, isLoading, fetchData };
};
export default useAxios;
