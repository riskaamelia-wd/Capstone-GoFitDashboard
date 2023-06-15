import { useState, useEffect } from "react";
import axios from "axios";

const useCrudApi = (api, params, filter) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(params, filter);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createData = async (newData) => {
    setIsLoading(true);
    try {
      const response = await api.post(params, newData);
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await api.put(`${params}/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === response.data.id ? response.data : item
        )
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id) => {
    setIsLoading(true);
    try {
      await api.delete(`${params}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params !== "/login") {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(params, filter);
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [api, filter, params]); // Empty dependency array to fetch data only once

  return { data, isLoading, error, createData, updateData, deleteData };
};

export default useCrudApi;
