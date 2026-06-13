import jwt from "jsonwebtoken";
import { ApiErrorResponse } from "../utils/apiErrorResponse.js";

export const protect = (req, res, next) => {
  try {
    let token;


    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json(
        ApiErrorResponse("Not authorized, no token"));
    }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json(
       ApiErrorResponse("Invalid token"));
  }
};