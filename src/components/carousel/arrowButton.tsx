import { FC } from "react";

interface arrowButtonProps {
  direction: string;
  onClick: () => void;
}

const ArrowButton: FC<arrowButtonProps> = ({ direction, onClick }) => {
  const icon =
    direction === "left" ? (
      <g
        id="Group_64"
        data-name="Group 64"
        transform="translate(-624.082 -383.588)"
      >
        <path
          id="Path_56"
          data-name="Path 56"
          d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z"
          fill="#ffffff"
        />
      </g>
    ) : (
      <g
        id="Group_65"
        data-name="Group 65"
        transform="translate(-831.568 -384.448)"
      >
        <path
          id="Path_57"
          data-name="Path 57"
          d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
          fill="#ffffff"
        />
      </g>
    );

  return (
    <div
      onClick={onClick}
      className={`h-full w-12 flex justify-center items-center hover:bg-gray-400/10 transition-all ease-in duration-100 cursor-pointer absolute ${direction}-0 top-0 z-50`}
    >
      <svg
        className="w-6 h-6"
        viewBox="-19.04 0 75.803 75.803"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">{icon}</g>
      </svg>
    </div>
  );
};

export default ArrowButton;
