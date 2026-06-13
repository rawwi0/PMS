import { ApiErrorResponse } from "../utils/apiErrorResponse.js";

export const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json(
    ApiErrorResponse(err.message || "Internal Server Error"));
};