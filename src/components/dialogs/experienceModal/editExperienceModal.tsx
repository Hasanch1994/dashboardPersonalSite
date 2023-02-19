import { FC, useEffect, useId, useState } from "react";
import JForm from "../../majors/form/Form";
import JInput from "../../majors/input/Input";
import JButton from "../../majors/buttons/Button";
import OutLineButton from "../../majors/buttons/OutlineButton";
import { useMutation } from "react-query";
import { editExperienceTypeRequest } from "../../../types/reqTypes";
import { editExperienceApi } from "../../../libs/services/endpoints/actions";
import { errorType } from "../../../types/defaultTypes";
import { messages } from "../../../messages";
import { experiencesTypeResponse } from "../../../types/respTypes";
import withClickOutside from "../../../hocs/outsideModalClick";

interface editExperienceModalProps {
  onClose(): void;
  onUpdate(data: editExperienceTypeRequest): void;
  preData: experiencesTypeResponse;
}

interface FormValueType {
  title: string;
  from: string;
  to: string;
  text: string;
  [key: string]: any;
}

interface ErrorFields {
  title: boolean;
  text: boolean;
  from: boolean;
  to: boolean;
  [key: string]: any;
}

interface Errors {
  [key: string]: boolean;
}

const EditExperienceModal: FC<editExperienceModalProps> = ({
  onClose,
  onUpdate,
  preData,
}) => {
  const [formValues, setFormValues] = useState<FormValueType>({
    from: preData.from,
    to: preData.to,
    text: preData.text,
    title: preData.title,
  });

  // useEffect(() => {
  //   setFormValues({
  //     from: preData.from,
  //     to: preData.to,
  //     text: preData.text,
  //     title: preData.title,
  //   });
  // }, []);

  const [errorFields, setErrorFields] = useState<ErrorFields>({
    from: false,
    text: false,
    title: false,
    to: false,
  });

  const { mutate, isLoading } = useMutation(
    "editExperience",
    editExperienceApi,
    {
      onSuccess: () => {
        onClose();
        // onUpdate(inputData!);
      },
      onError: () => {},
    }
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrorFields((prevValues) => ({
      ...prevValues,
      [name]: false,
    }));
  };

  const handleEditSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const requiredFields = ["title", "text", "from", "to"];
    const hasAllRequiredFields = requiredFields.every(
      (field) => !!formValues[field]
    );

    if (hasAllRequiredFields) {
      const data: editExperienceTypeRequest = {
        title: formValues.title,
        from: formValues.from,
        to: formValues.to,
        text: formValues.text,
      };
      try {
        mutate(data);
      } catch (err) {
        throw "failed to save portfolio";
      }
    } else {
      const errorFields = requiredFields.reduce((errors: Errors, field) => {
        if (!formValues[field]) {
          errors[field] = true;
        }
        return errors;
      }, {});
      setErrorFields((prevValues) => ({ ...prevValues, ...errorFields }));
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
          edit experience
        </h3>
      </header>

      <article className="flex flex-col w-full h-auto px-4 py-4 gap-y-4">
        <JForm
          error={{ status: false, message: "" }}
          className="gap-y-5 flex flex-col"
        >
          <JInput
            autoFocus
            error={{
              status: errorFields.title,
              message: messages.requiredField,
            }}
            name="title"
            className="w-full"
            type="text"
            required={true}
            placeholder={"title"}
            value={formValues && formValues.title}
            onChange={handleInputChange}
          />
          <JInput
            error={{
              status: errorFields.text,
              message: messages.requiredField,
            }}
            name="text"
            className="w-full"
            type="text"
            required={true}
            placeholder={"text"}
            value={formValues && formValues.text}
            onChange={handleInputChange}
          />

          <JInput
            error={{
              status: errorFields.from,
              message: messages.requiredField,
            }}
            name="from"
            className="w-full"
            type="date"
            required={true}
            placeholder={"from"}
            value={formValues && formValues.from}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-2 w-full">
            <JInput
              error={{
                status: errorFields.to,
                message: messages.requiredField,
              }}
              name="to"
              className="w-full"
              type="date"
              required={true}
              placeholder={"to"}
              value={formValues && formValues.to}
              onChange={handleInputChange}
            />

            <div className="flex items-center gap-x-2">
              <label htmlFor="nowChk">now</label>
              <JInput
                id="nowChk"
                name="now"
                className="w-full"
                type="checkbox"
                required={true}
                value={formValues && formValues.to}
                onChange={handleInputChange}
              />
            </div>
          </div>

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

export default withClickOutside(EditExperienceModal);
