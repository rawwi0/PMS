import jwt from "jsonwebtoken";
import { ApiErrorResponse } from "../utils/apiErrorResponse.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      let token;

      // Extract token
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      // No token
      if (!token) {
        return res.status(401).json(
          ApiErrorResponse("Not authorized, no token"));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      // If NO roles provided → only authentication
      if (!roles || roles.length === 0) {
        return next();
      }

      // Check user exists (extra safety)
      if (!req.user) {
        return res.status(401).json(
          ApiErrorResponse("Not authorized"));
      }

      // Role check
      if (!roles.includes(req.user.role)) {
        return res.status(403).json(
          ApiErrorResponse("Forbidden: insufficient permissions"));
      }

      next();

    } catch (err) {
      return res.status(401).json(
        ApiErrorResponse("Invalid token"));
    }
  };
};