import { ApiSuccessResponse } from "../../utils/apiSuccessResponse.js";
import { loginService } from "./auth.service.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    return res.status(200).json(ApiSuccessResponse(result ,"Login successful"));
  } catch (err) {
    next(err);
  }
}; 

export const logout = async (req, res) => {
  return res.status(200).json(ApiSuccessResponse(null,"Logged out successfully"));
};