interface TitleProps {
  value: number;
}

const titleValue: Record<number, string> = {
  2: "bg-red-50",
  4: "bg-red-100",
  8: "bg-red-200",
  16: "bg-red-300",
  32: "bg-red-400",
  64: "bg-red-500",
  128: "bg-red-600",
  256: "bg-red-700",
  512: "bg-red-800",
  1042: "bg-red-900",
  2048: "bg-red-950",
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
