import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const generateDiffPricesFn = () => {
  const changePrice = Math.floor(Math.random() * 100);
  let res = 0;
  if (changePrice < 50) {
    res = changePrice * -1;
  } else {
    res = changePrice - 50;
  }
  return res * 0.01;
};

export default function App() {
  const [price, setPrice] = useState(99);
  const [newDiff, setNewDiff] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      const _newDiff = generateDiffPricesFn();
      setNewDiff(_newDiff);
      const newPrices = price + _newDiff;
      setPrice(newPrices);
    }, 500);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      Price:{' '}
      <label
        style={
          newDiff > 0
            ? { color: 'green' }
            : newDiff < 0
            ? { color: 'red' }
            : { color: 'black' }
        }
      >
        {price}
      </label>
    </div>
  );
}








import React, { useState, useRef, useEffect } from 'react';

const getRandomPrice = (prev) => {
  // ±0.5
  const delta = (Math.random() - 0.5) * 1;
  return parseFloat((prev + delta).toFixed(2));
};

export default function App() {
  const [price, setPrice] = useState(100.0);
  const [highlight, setHighlight] = useState('none');
  const prevPriceRef = useRef(price);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const newPrice = getRandomPrice(prev);
        const direction =
          newPrice > prev ? 'up' : newPrice < prev ? 'down' : 'none';
        setHighlight(direction);

        // 闪动 500ms 后移除颜色
        setTimeout(() => {
          setHighlight('none');
        }, 500);

        prevPriceRef.current = newPrice;
        return newPrice;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const colorMap = {
    up: 'green',
    down: 'red',
    none: 'black',
  };
  return (
    <div
      style={{
        fontSize: '24px',
        color: colorMap[highlight],
        transition: 'color 0.2s',
      }}
    >
      Price: {price.toFixed(2)}
    </div>
  );
}
