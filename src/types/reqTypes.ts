// login type
export interface loginTypeRequest {
  userName: string;
  password: string;
}

// skills types
export interface addSkillTypeRequest {
  name: string;
  value: string | number;
}

export interface editSkillTypeRequest
  extends Pick<addSkillTypeRequest, "name" | "value"> {
  id: string;
}

// portfolio types
export interface addPortfolioTypeRequest {
  title: string;
  description: string;
  date: string;
  githubLink: string;
  Image: File[];
}

// edit experience
export interface editExperienceTypeRequest
  extends Pick<addPortfolioTypeRequest, "title"> {
  id?: string;
  from: string;
  to: string;
  text: string;
}

// add experience
export interface addExperienceTypeRequest
  extends Omit<editExperienceTypeRequest, "id"> {}
