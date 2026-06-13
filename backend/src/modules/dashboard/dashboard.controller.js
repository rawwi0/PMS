import * as dashboardService from "./dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardData();

    return res.status(200).json({
      data,
      issuccess: true,
      message: "Dashboard fetched successfully",
      errorMessages: null,
    });
  } catch (err) {
    next(err);
  }
};