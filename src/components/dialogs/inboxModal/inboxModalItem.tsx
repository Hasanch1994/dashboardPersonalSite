import { FC } from "react";

interface inboxModalItemProps {
  index: number;
  name: string;
  value: string | number;
}

const InboxModalItem: FC<inboxModalItemProps> = ({ name, value, index }) => {
  return (
    <div
      className={`flex items-baseline gap-x-3 px-3 py-2 ${
        index !== 4 ? "border-b" : ""
      }`}
    >
      <h3>{name}</h3>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  );
};

export default InboxModalItem;
