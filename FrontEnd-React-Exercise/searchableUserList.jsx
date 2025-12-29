// // Implementing a searchable user list
// questions is 
// import { useState, useEffect } from "react";

// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // TODO: useEffect 里 fetch 用户数据
//   // TODO: debounce query
//   // TODO: 加载更多

//   return (
//     <div>
//       <input
//         placeholder="Search users..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>{u.name}</li>
//         ))}
//       </ul>

//       <button onClick={() => setPage((p) => p + 1)}>Load More</button>
//     </div>
//   );
// }

// export default UserList;



import { useState, useEffect, useCallback, useRef } from 'react';

const useDebounce = (fn, wait) => {
  const timerId = useRef(null);
  return useCallback(
    (...args) => {
      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => fn(...args), wait);
    },
    [fn, wait]
  );
};

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();
    const fetchUserApi = async () => {
      try {
        setLoading(true);
        setError(null);

        const resp = await fetch(
          `https://api.github.com/search/users?q=${query}&page=${page}&per_page=5`,
          { signal: controller.signal }
        );

        if (!resp.ok) throw new Error('Failed to fetch');
        const data = await resp.json();

        setUsers((prev) =>
          page === 1 ? data.items : [...prev, ...data.items]
        );
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserApi();
    return () => controller.abort();
  }, [query, page]);

  const setDebounceQuery = useDebounce((val) => {
    setPage(1);
    setQuery(val);
  }, 500);

  return (
    <div>
      <input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setDebounceQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.login}</li>
        ))}
      </ul>

      {users.length > 0 && !loading && (
        <button onClick={() => setPage((p) => p + 1)}>Load More</button>
      )}
    </div>
  );
}

export default App;
