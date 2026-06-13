export const getPagination = (page =1 , limit = 10 ) => {
  const currentPage = Math.max(1, Number(page) || 1);

  const currentLimit = Math.max(1, Number(limit) || 10);

  return {
    page: currentPage,
    limit: currentLimit,
    skip: (currentPage - 1) * currentLimit,
  };
};

export const getPaginationMeta = (total, page, limit) => {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
