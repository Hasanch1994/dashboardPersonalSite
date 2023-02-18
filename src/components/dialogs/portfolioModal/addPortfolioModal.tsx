import { FC, useContext, useState } from "react";
import { useMutation } from "react-query";
import JButton from "../../majors/buttons/Button";
import OutLineButton from "../../majors/buttons/OutlineButton";
import { addPortfolioApi } from "../../../libs/services/endpoints/actions";
import { MainContext, mainContextType } from "../../../contexts/mainContext";
import JForm from "../../majors/form/Form";
import JInput from "../../majors/input/Input";
import JTextArea from "../../majors/input/TextArea";
import withClickOutside from "../../../hocs/outsideModalClick";
import PasteComponent from "../../svgs/pasteCo";
import PortfolioImageLists from "./portolioImagelist/portfolioImageList";

const selectedImageSize = 8;

interface FormValueType {
  title: string;
  date: string;
  githubLink: string;
  description: string;
  files: File[];
}

const AddPortfolioModal: FC = () => {
  const { showDeletePortfolio, showUpdatePortfolioList, showAddPortfolio } =
    useContext(MainContext) as mainContextType;

  const [formValues, setFormValues] = useState<FormValueType>({
    title: "",
    date: "",
    githubLink: "",
    description: "",
    files: [],
  });

  const { mutate, isLoading } = useMutation("addPortfolio", addPortfolioApi, {
    onSuccess: () => {
      alert("Inserted");
      handleShowAddPortfolio(false);
    },
    onError: () => {
      alert("Failed");
    },
  });

  const handleSavePortfolio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formValues.title);
    data.append("description", formValues.description);
    data.append("date", formValues.date);
    data.append("githubLink", formValues.githubLink);

    // set images
    formValues.files.forEach((image) => {
      data.append("Images", image);
    });

    mutate(data);
  };

  const handleShowAddPortfolio = (state: boolean) => {
    showAddPortfolio(state);
  };

  const handleClipboard = () => {
    navigator.clipboard.readText().then((clipText) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        githubLink: clipText,
      }));
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length <= selectedImageSize) {
        setFormValues((prevValues) => ({
          ...prevValues,
          files: selectedFiles,
        }));
      } else {
        alert("The number of selected images must be less than or equal to 8.");
      }
    }
  };

  return (
    <div className="componentFade overflow-y-auto w-full sm:mx-0 sm:w-1/3 max-h-full overflow-auto hideScroll bg-white rounded-lg shadow-2xl shadow-gray-200 border border-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <header className="relative top-0 left-0 w-full h-11 rounded-tr-lg rounded-tl-lg bg-blue-200 px-2 py-3">
        <span
          onClick={() => handleShowAddPortfolio(false)}
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
          add new Portfolio
        </h3>
      </header>
      <article className="flex flex-col w-full h-auto px-4 py-4 gap-y-4">
        <JForm className="flex flex-col gap-y-3">
          <JInput
            value={formValues.title}
            onChange={handleInputChange}
            name="title"
            type="text"
            placeholder="title of portfolio"
            required
          />
          <JInput
            value={formValues.date}
            onChange={handleInputChange}
            name="date"
            type="date"
            placeholder="date of portfolio created"
            required
          />
          <JInput
            value={formValues.githubLink}
            onChange={handleInputChange}
            name="githubLink"
            type="text"
            placeholder="githubLink"
            icon={<PasteComponent />}
            iconClick={handleClipboard}
          />

          <JTextArea
            value={formValues.description}
            onChange={handleInputChange}
            name="description"
            rows={5}
            placeholder="description"
          />

          <p className="text-sm text-gray-600">
            upload images: you can upload images with png/jpg format and with
            max 8 image number
          </p>

          {formValues.files && <PortfolioImageLists lists={formValues.files} />}

          <div className="bg-gray-100 border border-dashed border-gray-500 rounded-md cursor-pointer flex justify-center items-center">
            <label
              htmlFor="fileInput"
              className="w-full h-full flex flex-col items-center py-2 cursor-pointer"
            >
              <svg
                className="w-16 h-16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path
                    d="m8 8 4-4 4 4"
                    stroke="#6b7280"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <path
                    d="M12 4v12M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17"
                    stroke="#6b7280"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                </g>
              </svg>

              <span className="text-gray-500 text-base">upload your image</span>
            </label>

            <JInput
              type="file"
              multiple
              name="file"
              accept=".png,.jpg"
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </JForm>
        <div className="grid grid-cols-2 gap-x-4">
          <OutLineButton
            text="Cancel"
            onClick={() => handleShowAddPortfolio(false)}
          />
          <JButton
            redStyle={true}
            disabled={isLoading}
            loading={isLoading}
            text={"save"}
            onClick={handleSavePortfolio}
          />
        </div>
      </article>
    </div>
  );
};

export default withClickOutside(AddPortfolioModal);
