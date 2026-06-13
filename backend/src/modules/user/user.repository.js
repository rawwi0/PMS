import User from "./user.model.js";

export const createUser = (data) => User.create(data);

import { getPagination } from "../../utils/pagination.js";

export const getAllUsers = async (page, limit) => {
  const { skip, limit: pageLimit } = getPagination(page, limit);

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(pageLimit).lean(),

    User.countDocuments(),
  ]);

  return {
    users,
    total,
  };
};
export const getUserById = (id) => User.findById(id).lean();

export const updateUser = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });

export const deleteUser = (id) => User.findByIdAndDelete(id);

export const findByEmail = (email) =>
  User.findOne({ email }).select("+password");
