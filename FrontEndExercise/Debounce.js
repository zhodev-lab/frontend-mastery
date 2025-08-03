import { useRef, useEffect } from 'react';

export default function useDebounce(fn, wait) {
  const timerRef = useRef(null);

  // 返回一个稳定函数
  return (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
