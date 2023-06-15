import { useState, useEffect } from "react";
// how to use
/*
 -import the hooks 
  const [response, error, loading, axiosFetch] = useAxiosFunction();
- get data

 const getData = () => {
    axiosFetch({
      api: membershipApi,
      method: "get",
      url: "/membership",
    });
  };
  useEffect(() => {
    getData();
    // eslint-disable--line react-hooks/exhaustive-deps
  }, []);

  - post data
   axiosFetch({
      api: adminApi,
      method: "POST",
      url: "/login",
      requestConfig: {
        headers: {
          Accept: "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      },
    });
*/

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { api, method, url, requestConfig = {} } = configObj;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await api[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      //   console.log(res);
      setResponse(res.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(controller);

    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
