import { useEffect, useState } from "react";
import Title from "./Title";
import { useSwipeable } from "react-swipeable";

export default function Grid() {
  const [grid, setGrid] = useState<number[][]>([
    [4, 2, 4, 2],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 2],
  ]);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (hasMoved) {
      generateNewTitle();
      setHasMoved(false);
    }
  }, [hasMoved]);

  function generateNewTitle() {
    const newTitleValue = Math.floor(Math.random() * 10) + 1 === 10 ? 4 : 2;

    setGrid((prevGrid) => {
      const flatGrid = prevGrid.flat();

      const emptyIndexes = flatGrid
        .map((val, index) => (val === 0 ? index : -1))
        .filter((index) => index !== -1);

      if (emptyIndexes.length === 0) {
        return prevGrid;
      }

      const randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      flatGrid[randomIndex] = newTitleValue;

      const newGrid = [];
      for (let i = 0; i < flatGrid.length; i += 4) {
        newGrid.push(flatGrid.slice(i, i + 4));
      }

      return newGrid;
    });
  }

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
      setHasMoved(true);
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
      setHasMoved(true);
      return newGrid;
    });
  }

  function transpose(grid: number[][]): number[][] {
    return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
  }

  function onSwipeUp() {
    setGrid((prevGrid) => {
      const transposed = transpose(prevGrid);

      const moved = transposed.map((col) => {
        let newCol = col.filter((v) => v !== 0);
        for (let i = 0; i < newCol.length - 1; i++) {
          if (newCol[i] === newCol[i + 1]) {
            newCol[i] *= 2;
            newCol[i + 1] = 0;
          }
        }
        newCol = newCol.filter((v) => v !== 0);
        while (newCol.length < col.length) {
          newCol.push(0);
        }
        return newCol;
      });

      const result = transpose(moved);
      setHasMoved(true);
      return result;
    });
  }

  function onSwipeDown() {
    setGrid((prevGrid) => {
      const transposed = transpose(prevGrid);

      const moved = transposed.map((col) => {
        let newCol = col.filter((v) => v !== 0);
        for (let i = newCol.length; i > 0; i--) {
          if (newCol[i] === newCol[i - 1]) {
            newCol[i] *= 2;
            newCol[i - 1] = 0;
          }
        }
        newCol = newCol.filter((v) => v !== 0);
        while (newCol.length < col.length) {
          newCol.unshift(0);
        }
        return newCol;
      });

      const result = transpose(moved);
      setHasMoved(true);
      return result;
    });
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
