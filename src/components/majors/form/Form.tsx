import { HTMLProps, useEffect, useState } from "react";
import { errorType } from "../../../types/defaultTypes";

export interface formProps extends HTMLProps<HTMLFormElement> {
  children?: JSX.Element | JSX.Element[];
  error?: errorType;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ErrorMessage = ({ status, message }: errorType) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(status);
    const timeOut = setTimeout(() => {
      setShow((pre) => !pre);
    }, 2000);

    () => {
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <>
      {show ? <span className="text-red-500 text-base">{message}</span> : null}
    </>
  );
};

const JForm = ({ children, error, onSubmit, ...props }: formProps) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
      {error?.status && (
        <ErrorMessage status={error.status} message={error.message} />
      )}
    </form>
  );
};

export default JForm;
