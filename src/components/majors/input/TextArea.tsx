import React, { InputHTMLAttributes, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  error?: {
    status: boolean;
    message: string;
  };
  rows?: number;
  cols?: number;
}
const JTextArea = ({ error, rows = 3, cols, ...props }: InputProps) => {
  const uId = useId();
  const errorStatus = error?.status;

  return (
    <>
      <textarea
        rows={rows}
        cols={cols}
        id={uId}
        {...props}
        className={
          errorStatus
            ? "text-red-500 shadow-lg shadow-red-200 focus:shadow-lg focus:shadow-red-200"
            : ""
        }
      />
      {errorStatus && (
        <label className="text-red-500 text-base mt-1" htmlFor={uId}>
          {error.message}
        </label>
      )}
    </>
  );
};
export default React.memo(JTextArea);
