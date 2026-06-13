import * as userRepo from "./user.repository.js";
import { ApiError } from "../../utils/apiError.js";

export const createUserService = async (data) => {
  const existing = await userRepo.findByEmail(data.email);

  if (existing) {
    throw new ApiError(400, "E-mail already exists", "USER_ALREADY_EXIST");
  }

  return await userRepo.createUser(data);
};

export const getUsersService = async (page, limit) => {
  return await userRepo.getAllUsers(page, limit);
};

export const getUserService = async (id) => {
  if (!id) {
    throw new ApiError(400, "User id is Required", "USER_ID_REQUIRED");
  }

  const user = await userRepo.getUserById(id);

  if (!user) {
    throw new ApiError(404, "User not found ", "USER_NOT_FOUND");
  }

  return user;
};

export const updateUserService = async (id, data) => {
  if (!id) {
    throw new ApiError(400, "User id is Required", "USER_ID_REQUIRED");
  }

  const user = await userRepo.updateUser(id, data);

  if (!user) {
    throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  }

  return user;
};

export const deleteUserService = async (id) => {
  if (!id) {
    throw new ApiError(400, "User ID is required", "USER_ID_REQUIRED");
  }

  const user = await userRepo.deleteUser(id);

  if (!user) {
    throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  }

  return user;
};

// import * as userRepo from "./user.repository.js";
// import bcrypt from "bcryptjs";

// /**
//  * CREATE USER
//  */
// export const createUserService = async (data) => {
//   if (!data.name || !data.email || !data.password) {
//     throw new Error("Name, email and password are required");
//   }

//   const existing = await userRepo.findByEmail(data.email);
//   if (existing) {
//     throw new Error("Email already exists");
//   }

//   // Hash password
//   data.password = await bcrypt.hash(data.password, 10);

//   return userRepo.createUser(data);
// };

// /**
//  * GET ALL USERS
//  */
// export const getUsersService = async () => {
//   return userRepo.getAllUsers();
// };

// /**
//  * GET SINGLE USER
//  */
// export const getUserService = async (id) => {
//   if (!id) throw new Error("User ID is required");

//   const user = await userRepo.getUserById(id);
//   if (!user) throw new Error("User not found");

//   return user;
// };

// /**
//  * UPDATE USER
//  */
// export const updateUserService = async (id, data) => {
//   if (!id) throw new Error("User ID is required");

//   // 🔥 Handle password safely
//   if (data.password && data.password.trim() !== "") {
//     data.password = await bcrypt.hash(data.password, 10);
//   } else {
//     delete data.password; // remove invalid/empty password
//   }

//   const user = await userRepo.updateUser(id, data);
//   if (!user) throw new Error("User not found");

//   return user;
// };

// /**
//  * DELETE USER
//  */
// export const deleteUserService = async (id) => {
//   if (!id) throw new Error("User ID is required");

//   const user = await userRepo.deleteUser(id);
//   if (!user) throw new Error("User not found");

//   return user;
// };
