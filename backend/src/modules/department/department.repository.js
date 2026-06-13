import Department from "./department.model.js";
import { getPagination } from "../../utils/pagination.js";

export const createDepartment = (data) => Department.create(data);

export const getAllDepartments = async (page, limit) => {
  const { skip, limit: pageLimit } = getPagination(page, limit);

  const [departments, total] = await Promise.all([
    Department.find().skip(skip).limit(pageLimit).lean(),

    Department.countDocuments(),
  ]);

  return {
    departments,
    total,
  };
};

export const getDepartmentById = (id) => Department.findById(id).lean();

export const updateDepartment = (id, data) =>
  Department.findByIdAndUpdate(id, data, {
    new: true,
  });

export const deleteDepartment = (id) => Department.findByIdAndDelete(id);

export const findByName = (name) => Department.findOne({ name });
