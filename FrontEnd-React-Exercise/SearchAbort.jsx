import React, { useEffect, useRef, useState } from 'react';
import './style.css';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const controllerRef = useRef(null); // 存储当前的 AbortController

  const fetchApi = async () => {
    // 如果存在上一次请求，则中止它
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // 创建新的 AbortController
    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    try {
      const response = await fetch(
        `https://api.github.com/users/${inputValue}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('🔁 Previous request aborted.');
      } else {
        console.error('❌ Fetch error:', error);
      }
    }
  };

  // 清理组件卸载时的请求
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input value={inputValue} onChange={handleInput} />
      <button onClick={fetchApi}>Search</button>

      {data && (
        <div>
          <div><strong>Name:</strong> {data.login}</div>
          <div><strong>Public Repos:</strong> {data.public_repos}</div>
        </div>
      )}
    </div>
  );
}
