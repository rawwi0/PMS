import * as departmentRepo from "./department.repository.js";

import { ApiError } from "../../utils/apiError.js";

/**
 * GET ALL DEPARTMENTS
 */
export const getDepartmentsService =
  async (page, limit) => {
    return await departmentRepo.getAllDepartments(
      page,
      limit
    );
  };

/**
 * GET SINGLE DEPARTMENT
 */
export const getDepartmentService = async (id) => {
  if (!id) {
    throw new ApiError(
      400,
      "Department id is required",
      "DEPARTMENT_ID_REQUIRED",
    );
  }

  const department = await departmentRepo.getDepartmentById(id);

  if (!department) {
    throw new ApiError(404, "Department not found", "DEPARTMENT_NOT_FOUND");
  }

  return department;
};

/**
 * CREATE DEPARTMENT
 */
export const createDepartmentService = async (data) => {
  // NORMALIZE NAME
  const normalizedName = data.name.trim().toLowerCase();

  // CHECK DUPLICATE
  const existing = await departmentRepo.findByName(normalizedName);

  if (existing) {
    throw new ApiError(
      400,
      "Department already exists",
      "DEPARTMENT_ALREADY_EXISTS",
    );
  }

  // SAVE NORMALIZED
  return await departmentRepo.createDepartment({
    ...data,

    name: normalizedName,
  });
};

/**
 * UPDATE DEPARTMENT
 */
export const updateDepartmentService = async (id, data) => {
  if (!id) {
    throw new ApiError(
      400,
      "Department id is required",
      "DEPARTMENT_ID_REQUIRED",
    );
  }

  // IF NAME IS BEING UPDATED
  if (data.name) {
    const normalizedName = data.name.trim().toLowerCase();

    const existing = await departmentRepo.findByName(normalizedName);

    // PREVENT DUPLICATES
    if (existing && existing._id.toString() !== id) {
      throw new ApiError(
        400,
        "Department already exists",
        "DEPARTMENT_ALREADY_EXISTS",
      );
    }

    data.name = normalizedName;
  }

  const department = await departmentRepo.updateDepartment(id, data);

  if (!department) {
    throw new ApiError(404, "Department not found", "DEPARTMENT_NOT_FOUND");
  }

  return department;
};

/**
 * DELETE DEPARTMENT
 */
export const deleteDepartmentService = async (id) => {
  if (!id) {
    throw new ApiError(
      400,
      "Department id is required",
      "DEPARTMENT_ID_REQUIRED",
    );
  }

  const department = await departmentRepo.deleteDepartment(id);

  if (!department) {
    throw new ApiError(404, "Department not found", "DEPARTMENT_NOT_FOUND");
  }

  return department;
};

// import * as departmentRepo from "./department.repository.js";
// import { ApiError } from "../../utils/apiError.js";

// export const getDepartmentsService = async () => {
//   return await departmentRepo.getAllDepartments();
// };

// export const getDepartmentService = async (id) => {
//   if (!id) {
//     throw new ApiError(
//       400,
//       "Department id is required",
//       "DEPARTMENT_ID_REQUIRED",
//     );
//   }

//   const department = await departmentRepo.getDepartmentById(id);

//   if (!department) {
//     throw new ApiError(404, "Department not found", "DEPARTMENT_NOT_FOUND");
//   }

//   return department;
// };

// export const createDepartmentService = async (data) => {
//   const existing = await departmentRepo.findByName(data.name);

//   if (existing) {
//     throw new ApiError(
//       400,
//       "Department already exists",
//       "DEPARTMENT_ALREADY_EXISTS",
//     );
//   }

//   return await departmentRepo.createDepartment(data);
// };

// export const updateDepartmentService = async (id, data) => {
//   if (!id) {
//     throw new ApiError(
//       400,
//       "Department id is required",
//       "DEPARTMENT_ID_REQUIRED",
//     );
//   }

//   const department = await departmentRepo.updateDepartment(id, data);

//   if (!department) {
//     throw new ApiError(404, "Department not found", "DEPARTMENT_NOT_FOUND");
//   }

//   return department;
// };

// export const deleteDepartmentService = async (id) => {
//   if (!id) {
//     throw new ApiError(
//       400,
//       "Department id is required",
//       "DEPARTMENT_ID_REQUIRED",
//     );
//   }

//   const department = await departmentRepo.deleteDepartment(id);

//   if (!department) {
//     throw new ApiError(404, "Department not found", "DEPARTMENT_NOT_FOUND");
//   }

//   return department;
// };
