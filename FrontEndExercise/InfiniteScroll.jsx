import React, { useEffect, useState } from 'react';

const App = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 20 })]);
      setPage((p) => p + 1);
    }, 1000);
  };

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMore();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ul>
      {items.map((_, i) => (
        <li
          key={i}
          style={{
            panding: '5px',
            margin: '2px',
            height: '100px',
            border: '2px solid black',
          }}
        >
          Item #{i + 1}
        </li>
      ))}
    </ul>
  );
};

export default App;
