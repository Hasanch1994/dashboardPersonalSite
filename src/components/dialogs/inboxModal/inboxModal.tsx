import { FC, useEffect } from "react";
import { inboxTypeResponse } from "../../../types/respTypes";
import { convertTime } from "../../helper/convertTime";
import InboxModalItem from "./inboxModalItem";
import { useMutation } from "react-query";
import { updateInboxMessageApi } from "../../../libs/services/endpoints/actions";

interface InboxModalProps {
  data: inboxTypeResponse;
  onClose(): void;
  onUpdateMessage(id: string): void;
}

const InboxModal: FC<InboxModalProps> = ({
  data,
  onClose,
  onUpdateMessage,
}): JSX.Element => {
  const { mutate } = useMutation(updateInboxMessageApi, {
    onSuccess: () => {
      onUpdateMessage(data._id);
    },
    onError: () => {},
  });

  useEffect(() => {
    // update message visibility if true for read message status when unmounting
    // get messageId from the data
    return () => {
      const { _id, visited } = data;
      if (!visited) mutate(_id);
    };
  }, []);

  return (
    <div className="w-full sm:mx-0 sm:w-1/3 sm:h-2/3 overflow-auto bg-white rounded-lg shadow-2xl shadow-gray-200 border border-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <header className="relative top-0 left-0 w-full h-11 rounded-tr-lg rounded-tl-lg bg-blue-200 px-2 py-3">
        <span
          onClick={onClose}
          className="absolute right-0 top-1/2 -translate-y-1/2 mr-3 iconRipple"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_429_11083)">
              <path
                d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                stroke="#292929"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_429_11083">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>

        <h3 className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          message details
        </h3>
      </header>

      <article className="flex flex-col w-full px-4 py-2">
        <InboxModalItem
          index={0}
          name={"Name Family"}
          value={data.nameFamily}
        />
        <InboxModalItem
          index={1}
          name={"Email Address"}
          value={data.emailAddress}
        />
        <InboxModalItem
          index={2}
          name={"Request Type"}
          value={data.requestType}
        />
        <InboxModalItem
          index={3}
          name={"Date Time"}
          value={convertTime(data.date)}
        />
        <InboxModalItem index={4} name={"Message"} value={data.message} />
      </article>
    </div>
  );
};

export default InboxModal;
