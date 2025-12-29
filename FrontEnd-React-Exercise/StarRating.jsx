import React, { useState } from 'react';

const StarRating = ({ max = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{ color: (hovered ?? rating) > i ? 'gold' : 'gray', cursor: 'pointer', fontSize: 24 }}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setRating(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
