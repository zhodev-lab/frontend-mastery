
import React, { useEffect, useState } from 'react';

// 注意 response 之后的那一步也要有await ， 不然返回的response.json() 还是pending的

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // ES6+ 内置类
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json', {
          signal
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('❌ Fetch aborted');
        } else {
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => {
      // 💡 组件卸载时取消请求
      controller.abort();
    };
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}






useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === "AbortError") {
        console.log("⛔ Fetch 被中止了");
      }
    });

  return () => {
    controller.abort(); // 💥 在卸载时中止 fetch
  };
}, []);






