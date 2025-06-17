interface TitleProps {
  value: number;
}

const titleValue: Record<number, string> = {
  2: "bg-blue-500",
  4: "bg-red-500",
  8: "bg-yellow-500",
  16: "bg-grey-500",
};

export default function Title({ value }: TitleProps) {
  return (
    <div
      className={`${titleValue[value]} flex items-center justify-center text-xl font-bold rounded border-2`}
    >
      {
        <p className="w-24 h-24 flex justify-center items-center">
          {value !== 0 ? value : null}
        </p>
      }
    </div>
  );
}
