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
