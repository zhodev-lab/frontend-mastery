import React, { useState, useEffect, useCallback, useRef, JSX } from 'react';

interface RepoItem {
  id: number;
  name: string;
}

export default function App(): JSX.Element {
  const [inputTxt, setInputTxt] = useState<string>('');
  const [fetchTxt, setFetchTxt] = useState<string>('');
  const [suggestionsList, setSuggestionsList] = useState<RepoItem[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 输入框防抖
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputStr = e.target.value;
    setInputTxt(inputStr);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setFetchTxt(inputStr);
    }, 500);
  };

  // API 请求
  const apiFetch = useCallback(async (signal: AbortSignal): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const resp = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(fetchTxt)}`,
          { signal }
        );
        if (!resp.ok) throw new Error(`Network error: ${resp.status}`);
        const data = await resp.json();
        setSuggestionsList(data.items || []);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError(err.message || 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchTxt]
  );

  // 监听 fetchTxt 触发请求
  useEffect(() => {
    const controller = new AbortController();
    if (fetchTxt.trim()) {
      apiFetch(controller.signal);
    } else {
      setSuggestionsList([]);
    }
    return () => controller.abort();
  }, [fetchTxt, apiFetch]);

  // 渲染高亮
  const renderString = (input: string, respStr: string): JSX.Element | string => {
    const index = respStr.toLowerCase().indexOf(input.toLowerCase());
    if (index === -1 || !input) return respStr;
    const markLen = input.length;
    return (
      <>
        {respStr.slice(0, index)}
        <mark>{respStr.slice(index, index + markLen)}</mark>
        {respStr.slice(index + markLen)}
      </>
    );
  };

  return (
    <div>
      <input
        aria-label="input search text"
        onChange={handleChange}
        value={inputTxt}
        placeholder="Search GitHub repos..."
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {suggestionsList.map((item) => (
          <li key={item.id}>{renderString(fetchTxt, item.name)}</li>
        ))}
      </ul>
    </div>
  );
}
