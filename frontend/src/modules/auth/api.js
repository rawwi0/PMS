import api from "../../utils/axios";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};
