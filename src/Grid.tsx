import { useState } from "react";
import Title from "./Title";
import { useSwipeable } from "react-swipeable";

export default function Grid() {
  const [grid, setGrid] = useState<number[][]>([
    [2, 0, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
  ]);

  function onSwipeLeft() {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => {
        let newRow = row.filter((v) => v !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
          if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
          }
        }
        newRow = newRow.filter((v) => v !== 0);
        while (newRow.length < row.length) {
          newRow.push(0);
        }
        return newRow;
      });
      return newGrid;
    });
  }

  function onSwipeRight() {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => {
        let newRow = row.filter((v) => v !== 0);
        for (let i = newRow.length; i > 0; i--) {
          if (newRow[i] === newRow[i - 1]) {
            newRow[i] *= 2;
            newRow[i - 1] = 0;
          }
        }
        newRow = newRow.filter((v) => v !== 0);
        while (newRow.length < row.length) {
          newRow.unshift(0);
        }
        return newRow;
      });
      return newGrid;
    });
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
