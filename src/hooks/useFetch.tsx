import { useState } from "react";

const useFetch = (cb, option = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(option, ...args);
      setData(res);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
