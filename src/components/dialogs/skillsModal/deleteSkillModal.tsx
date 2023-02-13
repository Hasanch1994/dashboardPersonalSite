import { FC } from "react";
import { skillTypeResponse } from "../../../types/respTypes";
import JButton from "../../majors/buttons/Button";
import OutLineButton from "../../majors/buttons/OutlineButton";
import { useMutation } from "react-query";
import { deleteSkillApi } from "../../../libs/services/endpoints/actions";

interface deleteSkillModalProps {
  onClose(): void;
  onUpdate(id: string): void;
  data: skillTypeResponse;
  nodeRef: any;
}

const DeleteSkillModal: FC<deleteSkillModalProps> = ({
  onClose,
  onUpdate,
  data,
  nodeRef,
}) => {
  const { mutate, isLoading } = useMutation("deleteSkill", deleteSkillApi, {
    onSuccess: ({ msg }) => {
      onClose();
      onUpdate(data._id);
    },
    onError: () => {},
  });

  const handleDeleteSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate(data._id);
  };

  return (
    <div
      ref={nodeRef}
      className="w-full sm:mx-0 sm:w-1/3 sm:min-h-72  overflow-auto bg-white rounded-lg shadow-2xl shadow-gray-200 border border-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
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
          delete skill
        </h3>
      </header>

      <article className="flex flex-col w-full h-auto px-4 py-4 gap-y-4">
        <p>
          are you sure for delete skill{" "}
          <span className="innerSpan">{data.name}</span> name with{" "}
          <span className="innerSpan">{data.value}</span> value? if you confirm,
          skill deleted permanently.
        </p>

        <div className="grid grid-cols-2 gap-x-4">
          <OutLineButton text="cancel" onClick={onClose} />
          <JButton
            redStyle={true}
            disabled={isLoading}
            loading={isLoading}
            text={"delete"}
            onClick={handleDeleteSkill}
          />
        </div>
      </article>
    </div>
  );
};

export default DeleteSkillModal;
