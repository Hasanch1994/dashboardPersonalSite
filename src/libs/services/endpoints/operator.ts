import axios from "axios";
import { loginTypeRequest } from "../../../types/reqTypes";
import api from "../httpService";
export const loginUserApi = async (data: loginTypeRequest) => {
  try {
    const result = await api.post("/user/login", data);
    if (result) return result.data;
    else throw new Error("failed to login user");
  } catch (err) {
    console.log(err);
  }
};
