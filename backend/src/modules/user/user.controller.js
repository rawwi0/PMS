import * as userService from "./user.service.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";
import { userResponse, usersResponse } from "./user.dto.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiSuccessResponse } from "../../utils/apiSuccessResponse.js";
import { getPaginationMeta } from "../../utils/pagination.js";
import {sendWelcomeEmail} from "../../utils/email/email.service.js"
/**
 * CREATE USER
 */
export const createUser = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message, "VALIDATION_ERROR");
    }

    const user = await userService.createUserService(req.body ) ;

    // 🔥 force fresh fetch
    const createdUser = await userService.getUserService(user._id);
    
    await sendWelcomeEmail({
      name : user.name,
      email : user.email,
      password : req.body.password,
    });

    return res
      .status(201)
      .json(
        ApiSuccessResponse(
          userResponse(createdUser),
          "User created successfully",
        ),
      );
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL USERS
 */
export const getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const result = await userService.getUsersService(page, limit);

    return res.status(200).json(
      ApiSuccessResponse(
        {
          users: usersResponse(result.users),

          pagination: getPaginationMeta(result.total, page, limit),
        },
        "Users fetched successfully",
      ),
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE USER
 */
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserService(req.params.id);
    let data = userResponse(user);
    let response = ApiSuccessResponse(data, "User fetched successfully");
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE USER
 */
export const updateUser = async (req, res, next) => {
  try {
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message, "VALIDATION_ERROR");
    }

    const user = await userService.updateUserService(req.params.id, req.body);
    let data = userResponse(user);
    let response = ApiSuccessResponse(data, "User updated successfully");
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUserService(req.params.id);

    return res
      .status(200)
      .json(ApiSuccessResponse(null, "User deleted successfully"));
  } catch (err) {
    next(err);
  }
};
