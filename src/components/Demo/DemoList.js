import React, { useMemo } from "react";

import classes from "./DemoList.module.css";

const DemoList = (props) => {
  console.log("Demo List running");
  const { items } = props;
  // 현재 sortedList는 전달 받은 props배열을 오름차순 정렬해주는 계산이 담긴 로직이 있다.
  // 이 로직이 엄청 복잡한 계산은 아니지만 만약 복잡한 계산식이라고 가정해봤을때 이를 컴포넌트가 리랜더링될때마다 작업을 한다고 생각하면 비효율일것이다.
  // 이를 방지하는 방법으로 배웠던 React.memo를 해당 컴포넌트에 적용하여 불필요한 랜더링을 방지할 수 있지만, useCallback과 비슷한 기능을하는 useMemo 훅을 이용해주는게 국소적으로 변경되지 않는 데이터(값)인경우는 useMemo안 콜백함수가 재실행하는것을 막아주는 방법을 쓰는게 좋다.

  // 아래와 같이 적용하면 items가 변경할때만 리빌드한다.
  const sortedList = useMemo(() => {
    console.log("items sorted");
    return items.sort((a, b) => a - b);
  }, [items]);

  //   const sortedList = items.sort((a,b) => a - b)

  return (
    <div className={classes.list}>
      <h1>{props.title}</h1>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemoList;
