import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fecth the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            setIsPending(false);
            setError(err.message);
          }
        })
    }, 1000);

    // call abort controller to cleanup and abort
    // the fetch when user changes route in the middle
    // of a fetch request and avoid react warning errors
    return () => abortCont.abort();
  }, [url]);
  // [] is for useEffect dependencies
  //    to only run on firts render
  // [blogs] dependencies runs each
  //    time the blogs value changes

  return { data, isPending, error }
}

export default useFetch;