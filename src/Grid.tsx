import { useState } from "react";
import Title from "./Title";
import { useSwipeable } from "react-swipeable";

export default function Grid() {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
  ]);

  function onSwipeLeft() {
    console.log("you swiped left !");
  }

  function onSwipeRight() {
    console.log("you swiped right !");
  }

  function onSwipeUp() {
    console.log("you swiped up !");
  }

  function onSwipeDown() {
    console.log("you swiped down !");
  }

  const handlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    onSwipedDown: onSwipeDown,
    onSwipedUp: onSwipeUp,
    trackMouse: true,
    delta: 3,
  });

  return (
    <div
      {...handlers}
      className="flex justify-center cursor-pointer touch-none select-none"
    >
      <div className="grid grid-cols-4 gap-4 w-fit">
        {grid.flat().map((value, index) => (
          <Title key={index} value={value} />
        ))}
      </div>
    </div>
  );
}
