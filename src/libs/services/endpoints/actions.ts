import { msgType } from "./../../../types/defaultTypes";

import {
  inboxTypeResponse,
  portfolioTypeResponse,
  skillTypeResponse,
} from "./../../../types/respTypes";
import api from "../httpService";
import {
  addSkillTypeRequest,
  editSkillTypeRequest,
} from "../../../types/reqTypes";

// inboxes endpoints
export const fetchInboxApi = async (): Promise<Array<inboxTypeResponse>> => {
  const result: Array<inboxTypeResponse> = await (
    await api.get("/action/getContacts")
  ).data;
  if (result) return result;
  else throw new Error("failed to login user");
};

export const updateInboxMessageApi = async (
  messageId: string
): Promise<msgType> => {
  const result: msgType = await (
    await api.put(`/action/readContact/${messageId}`)
  ).data;
  if (result) return result;
  else throw new Error("failed to update message status");
};

// get skills
export const fetchSkillsApi = async (): Promise<Array<skillTypeResponse>> => {
  const result: Array<skillTypeResponse> = await (
    await api.get("/action/skills")
  ).data;
  if (result) return result;
  else throw new Error("failed to fetch skills");
};

// get skills
export const addSkillApi = async (
  data: addSkillTypeRequest
): Promise<msgType> => {
  const result: msgType = await (
    await api.post("/action/addNewSkill", data)
  ).data;
  if (result) return result;
  else throw new Error("failed to add new skill");
};

// delete skill
export const deleteSkillApi = async (id: string): Promise<msgType> => {
  const result: msgType = await (
    await api.delete(`/action/deleteSkill/${id}`)
  ).data;
  if (result) return result;
  else throw new Error("failed to delete skill");
};

//update skills
export const editSkillApi = async (
  data: editSkillTypeRequest
): Promise<msgType> => {
  const result: msgType = await (
    await api.put("/action/updateSkill", data)
  ).data;
  if (result) return result;
  else throw new Error("failed to edit skill");
};

// get portfolios
export const fetchPortfoliosApi = async (): Promise<
  Array<portfolioTypeResponse>
> => {
  const result: Array<portfolioTypeResponse> = await (
    await api.get("/action/portfolios")
  ).data;
  if (result) return result;
  else throw new Error("failed to fetch portfolios");
};

// delete portfolio
export const deletePortfolioApi = async (id: string): Promise<msgType> => {
  const result: msgType = await (
    await api.delete(`/action/deletePortfolio/${id}`)
  ).data;
  if (result) return result;
  else throw new Error("failed to delete portfolio");
};

export const addPortfolioApi = async (data: any): Promise<msgType> => {
  const result: msgType = await (
    await api.post("/action/addPortfolio", data)
  ).data;
  if (result) return result;
  else throw new Error("failed to add new portfolio");
};
