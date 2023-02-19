import { FC, memo } from "react";
import { experiencesTypeResponse } from "../../../types/respTypes";
import ExperienceItem from "./experienceItem";

interface experiencesItems {
  experiences: Array<experiencesTypeResponse> | undefined;
}

const ExperiencesItems: FC<experiencesItems> = memo(({ experiences }) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 w-full ">
      {experiences &&
        experiences.map((item) => (
          <ExperienceItem key={self.crypto.randomUUID()} data={item} />
        ))}
    </ol>
  );
});

export default ExperiencesItems;
