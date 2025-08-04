import React, { useEffect, useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [pageRows, setPageRows] = useState(5);
  const [currPage, setCurrPage] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      );
      const posts = await res.json();
      setPosts(posts);
    } catch (err) {
      console.error('❌ Fetch failed:', err);
    }
  };

  const handleOption = (e) => {
    console.log(e);
    setPageRows(Number(e.target.value));
    setCurrPage(0);
  };

  const handleNext = () => {
    if (Math.ceil(posts.length / pageRows) > currPage) {
      setCurrPage(currPage + 1);
    }
  };
  const handlePrev = () => {
    if (currPage > 0) {
      setCurrPage(currPage - 1);
    }
  };
  console.log(pageRows, currPage);
  return (
    <>
      <select onChange={handleOption} aria-label='select pagination size'>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <button onClick={handlePrev}>prev</button>
      <label>
        {currPage} of {Math.ceil(posts.length / pageRows)}pages
      </label>
      <button onClick={handleNext}>next</button>

      <table>
        <tr>
          <th>number</th>
          <th>name</th>
          <th>country</th>
          <th>age</th>
          <th>total</th>
          <th>sport</th>
        </tr>
        {posts
          .slice(currPage * pageRows, currPage * pageRows + pageRows)
          .map((item, index) => {
            return (
              <tr key={JSON.stringify(item) + '_' + index}>
                <td>{currPage * pageRows + index}</td>
                <td>{item.athlete}</td>
                <td>{item.country}</td>
                <td>{item.age}</td>
                <td>{item.total}</td>
                <td>{item.sport}</td>
              </tr>
            );
          })}
      </table>
    </>
  );
};

export default App;
