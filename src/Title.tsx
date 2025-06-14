interface TitleProps {
  value: number;
}

export default function Title({ value }: TitleProps) {
  return (
    <div className="bg-gray-200 flex items-center justify-center text-xl font-bold rounded">
      {
        <p className="w-24 h-24 flex justify-center items-center">
          {value !== 0 ? value : null}
        </p>
      }
    </div>
  );
}
