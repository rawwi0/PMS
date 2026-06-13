export const departmentResponse = (department) => {
  return {
    id: department._id.toString(),

    name: department.name,

    description: department.description,

    createdAt: department.createdAt,
  };
};

export const departmentsResponse = (departments) => {
  return departments.map(departmentResponse);
};

