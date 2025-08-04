import React, { useState, useEffect } from 'react';

const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const Search = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query);

  useEffect(() => {
    if (debounced) {
      console.log('🔍 Searching for:', debounced);
    }
  }, [debounced]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
};

export default Search;
