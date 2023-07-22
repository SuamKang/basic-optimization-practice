import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";
import Button from "./components/UI/Button/Button";
import DemoList from "./components/Demo/DemoList";

function App() {
  const [btnShow, setBtnShow] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  const [listTitle, setListTitle] = useState("my list");

  console.log("App Running");

  // 토글 함수
  const toggleHandler = useCallback(() => {
    // 여기선 allowToggle상태 스냅샷을 통해 setShowParagraph을 사용 여부를 확인할것이다.
    // allowToggle이 true일 때만 setShowParagraph을 호출할 수 있게 한다.(토글 이벤트가 가능한 상태로 됨)
    // 자바스크립트는 함수가 정의되면 동시에 클로저가 생기며, 함수 내부에서 사용되는 외부의 변수나 상수를 잠궈서 처음에 정의내린(클로저 생성시점) 그 시점의 변수값을 그대로 가진 상태로 메모리에 저장하게 된다. 그럼 변수의 값은 변수가 저장된 시점의 값을 사용하게 된다.

    // 현재 이 toggleHandler는 useCallback을 사용했기에 인자에 포함된 콜백함수는 맨처음 저장되고, 외부 상태가 변경이 되어 App함수가 재실행(리랜더링)되면 리액트는 이 콜백함수를 실행하지 않는다
    // 따라서, 리액트가 이 함수에 사용하기 위해 저장한 allowToggle값은 최신값이 아니고, App컴포넌트가 처음 실행된 시점의 값(초기값)을 저장하고 있다.
    // 그렇지만 이 콜백함수가 재생성해야할 때도 분명히 있을것이고, 그럴땐 외부에서 정의내린 값 즉, allowToggle상태가 변경되었을 수 도 있기 때문이다.
    // 이걸 종속 형태로 추가한다.
    // 이를 통해 allowToggle값이 바뀌고 새로운값이 들어오면, 콜백함수를 재생성하고 새로 만든 함수(allowToggle에 최신값이 담긴)를 다시 저장한다.

    // 결국 memo든 useCallback이든 랜더링을 시키느냐 마느냐를 결정하는데 중요한 키를 지니고있다.
    if (allowToggle) {
      setShowParagraph((prev) => !prev);
    }
  }, [allowToggle]);

  // 토글버튼 활성화만을 시켜주는 함수
  const allowToggleHandler = () => {
    setAllowToggle((prev) => !prev);
  };

  const changeTitleHandler = useCallback(() => {
    setListTitle("New one");
  }, []);

  // itemsArray에도 useMemo를 해주었기에 props로 전달했을때 이 배열은 useMemo에 의해 같은 데이터로 저장이 되어 변경이 되지 않았을경우 변경점으로 인식하지 않게 된다. 따라서 DemoList컴포넌트 안에서 진행되는 sorted연산처리가 진행되지 않는 이유이고, 랜더링시 콘솔에 로깅되어지지 않는것이다.

  // 보통은 데이터를 기억하는것 보다 함수를 기억하는 편이 많아서 useMemo보단 useCallback이 더 자주사용되지만, 성능 집약적 잡업 때문에 데이터를 저장해야할 경우가 아니라면 별로 사용 안한다.

  // 여기서 기억해야할점은, useMeme를 사용하는것 또한 메모리를 사용하는것이고 일정 성능을 사용하는 것이다.

  const itmesArray = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={itmesArray} />
      <DemoOutput show={showParagraph} />
      <Button onClick={changeTitleHandler}>Change Title</Button>
      {btnShow && (
        <>
          <Button type="button" onClick={allowToggleHandler}>
            Allow Paragraph
          </Button>
          <Button type="button" onClick={toggleHandler}>
            Toggle Paragraph
          </Button>
        </>
      )}
    </div>
  );
}

export default App;
