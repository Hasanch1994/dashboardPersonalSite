import { InputHTMLAttributes, ReactNode, memo, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: {
    status: boolean;
    message: string;
  };
  icon?: ReactNode;
  iconClick?: () => void;
}
const JInput = ({ error, icon, iconClick, ...props }: InputProps) => {
  const uId = useId();

  return (
    <>
      {error?.status ? (
        <>
          {" "}
          <div className={`${icon && "relative"}`}>
            <input
              id={uId}
              {...props}
              className="text-red-500 shadow-lg shadow-red-200 focus:shadow-lg focus:shadow-red-200"
            />

            {icon && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 ">
                {icon}
              </span>
            )}
          </div>
          <label className="text-red-500 text-base" htmlFor={uId}>
            {error.message}
          </label>
        </>
      ) : !icon ? (
        <input id={uId} {...props} />
      ) : (
        <div className="relative">
          <input id={uId} {...props} className="w-full" name="githubLink" />
          <span
            onClick={iconClick}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
          >
            {icon}
          </span>
        </div>
      )}
    </>
  );
};

export default memo(JInput);
