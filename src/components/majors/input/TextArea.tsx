import { InputHTMLAttributes, memo, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  error?: {
    status: boolean;
    message: string;
  };
  rows?: number;
  cols?: number;
}
const JTextArea = ({ error, rows, cols, ...props }: InputProps) => {
  const uId = useId();

  return (
    <>
      {error?.status ? (
        <>
          <textarea
            rows={rows}
            cols={cols}
            id={uId}
            {...props}
            className="text-red-500 shadow-lg shadow-red-200 focus:shadow-lg focus:shadow-red-200"
          />

          <label className="text-red-500 text-base" htmlFor={uId}>
            {error.message}
          </label>
        </>
      ) : (
        <textarea rows={rows} cols={cols} id={uId} {...props} />
      )}
    </>
  );
};

export default memo(JTextArea);
