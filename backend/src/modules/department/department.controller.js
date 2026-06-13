import * as departmentService from "./department.service.js";

import { departmentResponse, departmentsResponse } from "./department.dto.js";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department.validation.js";

import { ApiError } from "../../utils/apiError.js";

import { ApiSuccessResponse } from "../../utils/apiSuccessResponse.js";
import { getPaginationMeta } from "../../utils/pagination.js";

/**
 * CREATE DEPARTMENT
 */
export const createDepartment = async (req, res, next) => {
  try {
    const { error } = createDepartmentSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message, "VALIDATION_ERROR");
    }

    const department = await departmentService.createDepartmentService(
      req.body,
    );

    return res
      .status(201)
      .json(
        ApiSuccessResponse(
          departmentResponse(department),
          "Department created successfully",
        ),
      );
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL DEPARTMENTS
 */
export const getDepartments = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const result = await departmentService.getDepartmentsService(page, limit);

    return res.status(200).json(
      ApiSuccessResponse(
        {
          departments: departmentsResponse(result.departments),

          pagination: getPaginationMeta(result.total, page, limit),
        },
        "Departments fetched successfully",
      ),
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE DEPARTMENT
 */
export const getDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.getDepartmentService(
      req.params.id,
    );

    return res
      .status(200)
      .json(
        ApiSuccessResponse(
          departmentResponse(department),
          "Department fetched successfully",
        ),
      );
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE DEPARTMENT
 */
export const updateDepartment = async (req, res, next) => {
  try {
    const { error } = updateDepartmentSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message, "VALIDATION_ERROR");
    }

    const department = await departmentService.updateDepartmentService(
      req.params.id,
      req.body,
    );

    return res
      .status(200)
      .json(
        ApiSuccessResponse(
          departmentResponse(department),
          "Department updated successfully",
        ),
      );
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE DEPARTMENT
 */
export const deleteDepartment = async (req, res, next) => {
  try {
    await departmentService.deleteDepartmentService(req.params.id);

    return res
      .status(200)
      .json(ApiSuccessResponse(null, "Department deleted successfully"));
  } catch (err) {
    next(err);
  }
};
