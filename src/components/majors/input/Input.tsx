import React, { InputHTMLAttributes, ReactNode, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: {
    status: boolean;
    message: string;
  };
  icon?: ReactNode;
  iconClick?: () => void;
}

const JInput = ({ error, icon, iconClick, ...props }: InputProps) => {
  const uniqueId = useId();

  // Render different input types based on error and icon status
  if (error?.status) {
    return (
      <div className={icon ? "relative" : ""}>
        <input
          id={uniqueId}
          {...props}
          className="w-full text-red-500 shadow-lg shadow-red-200 focus:shadow-lg focus:shadow-red-200"
        />

        {icon && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 ">
            {icon}
          </span>
        )}

        <label className="text-red-500 text-base" htmlFor={uniqueId}>
          {error.message}
        </label>
      </div>
    );
  } else {
    return (
      <div className={icon ? "relative" : "flex"}>
        <input id={uniqueId} {...props} className={`w-full`} />

        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ">
            {icon}
          </span>
        )}
      </div>
    );
  }
};

export default React.memo(JInput);
