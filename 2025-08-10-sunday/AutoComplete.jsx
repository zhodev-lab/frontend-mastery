import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function App() {
  const [inputTxt, setInputTxt] = useState('');
  const [fetchTxt, setFetchTxt] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const inputStr = e.target.value;
    setInputTxt(inputStr);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setFetchTxt(inputStr);
    }, 500);
  };

  const apiFetch = useCallback(async (signal) => {
    try {
      const resp = await fetch(
        `https://api.github.com/search/repositories?q=${fetchTxt}`,
        { signal }
      );
      if (!resp.ok) throw new Error('Network error');
      const data = await resp.json();
      setSuggestionsList(data.items || []);
    } catch (err) {
      if (err.name !== 'AbortError') console.error(err);
    }
  }, [fetchTxt]);

  useEffect(() => {
    const controller = new AbortController();
    if (fetchTxt) apiFetch(controller.signal);
    return () => controller.abort();
  }, [fetchTxt, apiFetch]);

  const renderString = (input, respStr) => {
    const index = respStr.toLowerCase().indexOf(input.toLowerCase());
    if (index === -1) return respStr;
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
    <>
      <input
        aria-label="input search text"
        onChange={handleChange}
        value={inputTxt}
      />
      <ul>
        {suggestionsList.map((item) => (
          <li key={item.id}>{renderString(fetchTxt, item.name)}</li>
        ))}
      </ul>
    </>
  );
}
