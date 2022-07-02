import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API;

export const useFetch = (ep) => {
  const [endpoint, setEndpoint] = useState(ep);

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  useEffect(() => {
    fetch(API + endpoint)
      .then(async (response) => {
        if (response.ok) return await response.json();
        else return Promise.reject();
      })
      .then((data) => {
        setState((s) => ({ ...s, data, hasError: null, isLoading: false }));
      })
      .catch((e) => {
        setState((s) => ({
          ...s,
          data: null,
          isLoading: false,
          hasError: 'Unable to get data',
        }));
      });
  }, [endpoint]);

  return { ...state, setEndpoint };
};
