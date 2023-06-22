import { useState, useEffect } from "react";
const useFetch = ({ api, method, url,  body }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchData = async () => {
        if (method) {
            api({
              method,
              url,
              data: body,
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
        fetchData();
      }, [api, body, method, url]);
  
    return { response, error, isLoading, fetchData };
  };
  export default useFetch;