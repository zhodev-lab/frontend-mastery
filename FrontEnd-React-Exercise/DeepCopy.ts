const deepClone = <T,>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  const clonedObj = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
};


// hook 
// import { useMemo } from 'react';
// const deepClone = <T,>(obj: T): T => {
//   return structuredClone(obj);
// };
// export const useDeepClone = <T,>(value: T): T => {
//   const clonedValue = useMemo(() => {
//     return deepClone(value);
//   }, [value]);

//   return clonedValue;
// };


// 为什么不用 JSON.parse(JSON.stringify())? 

// “It breaks on functions, dates, undefined, and loses type fidelity.”