import { FC, memo, useContext, useEffect, useState } from "react";
import { MainContext, toastContextType } from "../../../contexts/mainContext";

export interface toastProps {
  type: "error" | "success" | "info" | string;
  message: string;
  position: "bottomRight" | "topRight";
  nodeRef: any;
}

const ToastMessage: FC<toastProps> = memo(
  ({ message, position, type, nodeRef }) => {
    const { showToast } = useContext(MainContext) as toastContextType;
    const [bgColor] = useState<string>(
      type === "error"
        ? "bg-red-200"
        : type === "success"
        ? "bg-green-200"
        : "bg-blue-200"
    );

    const [textColor] = useState<string>(
      type === "error"
        ? "text-red-600"
        : type === "success"
        ? "text-green-600"
        : "text-blue-600"
    );

    const [borderColor] = useState<string>(
      type === "error"
        ? "border-red-200"
        : type === "success"
        ? "border-green-200"
        : "<border-blue-2></border-blue-2>00"
    );

    useEffect(() => {
      const toastTimeOut = setTimeout(() => {
        showToast({
          message: "disappearing...",
          position: "bottomRight",
          state: false,
          type: "success",
        });
      }, 1500);

      //clear timeout
      return () => {
        clearTimeout(toastTimeOut);
      };
    });

    return (
      <div
        ref={nodeRef}
        className={`min-w-[350px] flex flex-col absolute right-4 gap-y-2 from border rounded-md px-3 py-2 ${bgColor} ${textColor} ${borderColor}  ${
          position === "bottomRight" ? "bottom-6 " : "top-10"
        }`}
      >
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <h4>{type}</h4>
        </div>
        {message}
      </div>
    );
  }
);

export default ToastMessage;
