import { FC } from "react";

interface progressBarProps {
  percent: number | string;
}

const ProgressBar: FC<progressBarProps> = ({ percent }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full min-w-[5rem]">
      <div
        className="bg-gradient-to-r from-red-400 to-orange-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${percent}%` }}
      >
        {percent}
        {"%"}
      </div>
    </div>
  );
};

export default ProgressBar;
