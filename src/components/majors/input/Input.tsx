import React, { memo } from "react";

export type inputProps = {
  error?: {
    status: boolean;
    message: string;
  };

  uId?: string;
  onChange?: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};
const JInput = ({ error, uId, ...props }: inputProps | any) => {
  return (
    <>
      {error?.status ? (
        <>
          {" "}
          <input
            id={uId}
            {...props}
            className="text-red-500 shadow-lg shadow-red-200 focus:shadow-lg focus:shadow-red-200"
          />
          <label className="text-red-500 text-base" htmlFor={uId}>
            {error.message}
          </label>
        </>
      ) : (
        <input id={uId} {...props} />
      )}
    </>
  );
};

export default memo(JInput);
