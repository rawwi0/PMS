import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as userRepo from "../user/user.repository.js";
import { ApiError } from "../../utils/apiError.js";

export const loginService = async (email, password) => {
  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(200, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};