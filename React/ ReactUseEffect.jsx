
useEffect(() => {
  fetchData().then(setData);
}, [query]);

// is this safe ?
// if the query change, the old fetch slow will cover the new fetch data 
// 回答：当 query 快速变动时，旧的 fetch 结果可能会覆盖新的，需要加上标识（如 isStale）或 abort。 




// improve 1 
useEffect(() => {
  let isStale = false;

  fetchData(query).then((data) => {
    if (!isStale) {
      setData(data);
    }
  });

  return () => {
    isStale = true; // 标记这个 effect 已废弃，防止设置已卸载或过期数据
  };
}, [query]);

// improve 2 
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  fetch(`/api/search?q=${query}`, { signal })
    .then(res => res.json())
    .then(data => {
      setData(data);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error(err);
      }
    });

  return () => {
    controller.abort(); // 取消之前的请求
  };
}, [query]);


import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'get', options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios({
          url,
          method,
          signal,
          ...options,
        });
        setData(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, method, JSON.stringify(options)]); // options should be stable or memoized

  return { data, loading, error };
};

export default useFetch;
