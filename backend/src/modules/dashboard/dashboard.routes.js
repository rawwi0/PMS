import express from "express";
import { getDashboard } from "./dashboard.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics APIs
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 stats:
 *                   totalUsers: 10
 *                   totalProjects: 5
 *                   totalDepartments: 3
 *                   totalTasks: 25
 *                   openTasks: 15
 *                   completedTasks: 10
 *                 activeProjects: []
 *                 recentTasks: []
 */

// GET /api/dashboard
router.get("/", protect, getDashboard);

export default router;

// import express from "express";
// import { getDashboard } from "./dashboard.controller.js";
// import { protect } from "../../middlewares/auth.middleware.js";

// const router = express.Router();

// // GET /api/dashboard
// router.get("/", protect, getDashboard);

// export default router;