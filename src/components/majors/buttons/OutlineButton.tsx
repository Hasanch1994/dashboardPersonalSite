import { MouseEventHandler, memo } from "react";

export type outlinedButtonProps = {
  text: string;
  onClick?: MouseEventHandler;
};
const OutLineButton = memo(
  ({ text, onClick, ...props }: outlinedButtonProps) => {
    return (
      <button className="outlinedButton" onClick={onClick} {...props}>
        {text}
      </button>
    );
  }
);

export default OutLineButton;
