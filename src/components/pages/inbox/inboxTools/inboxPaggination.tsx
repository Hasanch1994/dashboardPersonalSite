import { FC } from "react";

interface InboxPaginationProps {
  totalInbox: number;
  indexOfFirstPost: number;
  indexOfLastPost: number;
  paginate(type: string): void;
  currentPage: number;
  postPerPage: number;
}

const InboxPagination: FC<InboxPaginationProps> = ({
  totalInbox,
  paginate,
  indexOfFirstPost,
  indexOfLastPost,
  currentPage,
  postPerPage,
}) => {
  const pageCount = Math.ceil(totalInbox / postPerPage);

  return (
    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex h-full items-center">
      <span>
        {indexOfFirstPost + 1}-
        {totalInbox >= postPerPage ? indexOfLastPost : totalInbox} of{" "}
        {totalInbox}
      </span>

      <div className="flex ml-4 gap-x-4">
        <span
          className={`iconRipple ${currentPage === 1 && "opacity-50"}`}
          onClick={() => currentPage !== 1 && paginate("decrement")}
        >
          <svg
            className="w-4 h-4 "
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
              fill={`${currentPage === 1 ? "#c7c7c7" : "#000000"}`}
            />
          </svg>
        </span>

        <span
          className={`iconRipple ${currentPage === pageCount && "opacity-50"}`}
          onClick={() => currentPage < pageCount && paginate("increment")}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
              fill={`${currentPage < pageCount ? "#000000" : "#c7c7c7"}`}
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default InboxPagination;
