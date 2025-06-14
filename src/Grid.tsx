import Title from "./Title";

export default function Grid() {
  const grid = [
    [0, 0, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-4 w-fit">
        {grid.flat().map((value, index) => (
          <Title key={index} value={value} />
        ))}
      </div>
    </div>
  );
}
