import { FC, useContext } from "react";
import { useMutation } from "react-query";
import JButton from "../../majors/buttons/Button";
import OutLineButton from "../../majors/buttons/OutlineButton";
import { deletePortfolioApi } from "../../../libs/services/endpoints/actions";
import { MainContext, mainContextType } from "../../../contexts/mainContext";

interface DeletePortfolioModalProps {
  id: string;
}

const DeletePortfolioModal: FC<DeletePortfolioModalProps> = ({ id }) => {
  const { showDeletePortfolio, showUpdatePortfolioList } = useContext(
    MainContext
  ) as mainContextType;
  const { mutate, isLoading } = useMutation(
    "deletePortfolio",
    deletePortfolioApi,
    {
      onSuccess: () => {
        showDeletePortfolio({ itemId: id, state: false });
        showUpdatePortfolioList({ itemId: id, state: true });
      },
      onError: () => {},
    }
  );

  const handleDeletePortfolio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <div className="componentFade w-full sm:mx-0 sm:w-1/3 sm:min-h-72 overflow-auto bg-white rounded-lg shadow-2xl shadow-gray-200 border border-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <header className="relative top-0 left-0 w-full h-11 rounded-tr-lg rounded-tl-lg bg-blue-200 px-2 py-3">
        <span
          onClick={() => showDeletePortfolio({ itemId: "", state: false })}
          className="absolute right-0 top-1/2 -translate-y-1/2 mr-3 iconRipple"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_429_11083)">
              <path
                d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                stroke="#292929"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          Delete Portfolio
        </h3>
      </header>
      <article className="flex flex-col w-full h-auto px-4 py-4 gap-y-4">
        <p>Are you sure you want to delete this portfolio?</p>
        <div className="grid grid-cols-2 gap-x-4">
          <OutLineButton
            text="Cancel"
            onClick={() => showDeletePortfolio({ itemId: "", state: false })}
          />
          <JButton
            redStyle={true}
            disabled={isLoading}
            loading={isLoading}
            text={"Delete"}
            onClick={handleDeletePortfolio}
          />
        </div>
      </article>
    </div>
  );
};

export default DeletePortfolioModal;
