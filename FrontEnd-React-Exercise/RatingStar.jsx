import React, { useEffect, useState } from 'react';

const Stared = (
  <img
    width="48"
    height="48"
    src="https://img.icons8.com/fluency/48/star--v1.png"
    alt="star--v1"
  />
);
const Plain_Star = (
  <img
    width="50"
    height="50"
    src="https://img.icons8.com/ios/50/star--v1.png"
    alt="star--v1"
  />
);

const Star = ({ totalStar = 5, defaultStar = 0 }) => {
  const [starList, setStarList] = useState([]);
  const [userBehaviorStarList, setUserBehaviorStarList] = useState([]);

  useEffect(() => {
    if (totalStar) {
      const initialArr = new Array(totalStar).fill(false);
      for (let i = 0; i < defaultStar; i++) {
        initialArr[i] = true;
      }
      setStarList([...initialArr]);
    }
  }, [totalStar, defaultStar]);

  const mouseOverHandler = (idx) => {
    const userBehaviorArr = [...starList].slice();
    for (let i = 0; i < idx + 1; i++) {
      userBehaviorArr[i] = true;
    }
    setUserBehaviorStarList([...userBehaviorArr]);
  };
  const mouseLeaveHandler = () => {
    setUserBehaviorStarList([...starList].slice());
  };
  const clickHandler = (idx) => {
    console.log('onclick', idx);
    const newStarList = [...starList].slice();
    for (let i = 0; i < idx + 1; i++) {
      newStarList[i] = true;
    }
    setStarList([...newStarList]);
  };
  return (
    <>
      <div className="star_list_outline">
        {starList.map((s, index) => {
          return (
            <span
              key={index}
              onMouseOver={() => mouseOverHandler(index)}
              onMouseLeave={mouseLeaveHandler}
              onClick={() => clickHandler(index)}
            >
              {s || userBehaviorStarList[index] ? (
                <button>{Stared}</button>
              ) : (
                <button>{Plain_Star}</button>
              )}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Star;
