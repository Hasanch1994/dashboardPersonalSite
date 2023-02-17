import { FC, useEffect, useId, useState } from "react";
import JForm from "../../majors/form/Form";
import JInput from "../../majors/input/Input";
import JButton from "../../majors/buttons/Button";
import OutLineButton from "../../majors/buttons/OutlineButton";
import { useMutation } from "react-query";
import { editSkillTypeRequest } from "../../../types/reqTypes";
import { editSkillApi } from "../../../libs/services/endpoints/actions";
import { errorType } from "../../../types/defaultTypes";
import { messages } from "../../../messages";
import { skillTypeResponse } from "../../../types/respTypes";
import withClickOutside from "../../../hocs/outsideModalClick";

interface editSkillModalProps {
  onClose(): void;
  onUpdate(data: editSkillTypeRequest): void;
  preData: skillTypeResponse;
}

const EditSkillModal: FC<editSkillModalProps> = ({
  onClose,
  onUpdate,
  preData,
}) => {
  const [inputData, setInputData] = useState<editSkillTypeRequest>();

  useEffect(() => {
    setInputData({ id: preData._id, name: preData.name, value: preData.value });
  }, []);
  const [nameError, setNameError] = useState<errorType>({
    status: false,
  });
  const [valueError, setValueError] = useState<errorType>({
    status: false,
  });

  const { mutate, isLoading } = useMutation("editSkill", editSkillApi, {
    onSuccess: () => {
      onClose();
      onUpdate(inputData!);
    },
    onError: () => {},
  });

  const handleEditSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let name, value;

    if (inputData && inputData.name && inputData.value) {
      name = inputData.name.trim();
      value = inputData.value;

      if (Number(value) <= 100) mutate(inputData);
      else setValueError({ status: true, message: messages.skillValueError });
    } else {
      if (!name)
        setNameError({ status: true, message: messages.requiredField });

      if (!value)
        setValueError({ status: true, message: messages.requiredField });
    }
  };

  return (
    <div className="w-full componentFade  sm:mx-0 sm:w-1/3 sm:min-h-72 overflow-auto bg-white rounded-lg shadow-2xl shadow-gray-200 border border-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
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
          edit skill
        </h3>
      </header>

      <article className="flex flex-col w-full h-auto px-4 py-4 gap-y-4">
        <JForm
          error={{ status: false, message: "" }}
          className="gap-y-5 flex flex-col"
        >
          <JInput
            autoFocus
            error={nameError}
            className="w-full"
            uId={useId()}
            type="text"
            required={true}
            placeholder={"name"}
            value={inputData && inputData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (nameError.status) {
                setNameError((preState) => {
                  let cp = { ...preState };
                  cp.status = false;
                  cp.message = "";
                  return cp;
                });
              }

              setInputData((prevState) => {
                let cp = { ...prevState };
                cp.name = e.target.value;
                return cp;
              });
            }}
          />
          <JInput
            error={valueError}
            className="w-full"
            uId={useId()}
            type="number"
            min="1"
            max="100"
            required={true}
            placeholder={"value"}
            value={inputData && inputData.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValueError((preState) => {
                let cp = { ...preState };
                cp.status = false;
                cp.message = "";
                return cp;
              });

              setInputData((prevState) => {
                let cp = { ...prevState };
                cp.value = e.target.value;
                return cp;
              });
            }}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <OutLineButton text="cancel" onClick={onClose} />
            <JButton
              disabled={isLoading}
              loading={isLoading}
              text={"save"}
              onClick={handleEditSkill}
            />
          </div>
        </JForm>
      </article>
    </div>
  );
};

export default withClickOutside(EditSkillModal);
