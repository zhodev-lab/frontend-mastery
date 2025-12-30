const FeedbackSystem = () => {

  const [displayAspects, setDisplayAspects] = useState([
    { name: 'Readability', like: 0, dislike: 0 },
    { name: 'Performance', like: 0, dislike: 0 },
    { name: 'Security', like: 0, dislike: 0 },
    { name: 'Documentation', like: 0, dislike: 0 },
    { name: 'Testing', like: 0, dislike: 0 },
  ]);

  // 这步之前有错， 我应该是 用 prev 来做
  
  const handleVote = (name, type) => {
    setDisplayAspects(prev =>
      prev.map(item =>
        item.name === name
          ? { ...item, [type]: item[type] + 1 }
          : item
      )
    );
  };

  return (
    <div className="flex wrap justify-content-center gap-30">
      {displayAspects.map((item, index) => (
        <div className="card" key={item.name}>
          <h2>{item.name}</h2>
          <button onClick={() => handleVote(item.name, 'like')}>
            👍 Upvote
          </button>
          <button onClick={() => handleVote(item.name, 'dislike')}>
            👎 Downvote
          </button>
          <p>Upvotes: {item.like}</p>
          <p>Downvotes: {item.dislike}</p>
        </div>
      ))}
    </div>
  );
};
