import { ReactElement, useEffect, useState } from "react";
import { errorType } from "../../../types/defaultTypes";

export interface formProps {
  children?: JSX.Element | JSX.Element[];
  error?: errorType;
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

const JForm = ({ children, error, ...props }: formProps) => {
  return (
    <form {...props}>
      {children}
      {error?.status && (
        <ErrorMessage status={error.status} message={error.message} />
      )}
    </form>
  );
};

export default JForm;
