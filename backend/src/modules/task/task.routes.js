import express from "express";

import * as taskController from "./task.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "./task.validation.js";

import { protect } from "../../middlewares/auth.middleware.js";

import { authorize } from "../../middlewares/role.middleware.js";

import { getTasksByProject } from "./task.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - project
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *                 example: Create Login API
 *               description:
 *                 type: string
 *                 example: Implement JWT based login endpoint
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - in-progress
 *                   - completed
 *                 example: todo
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-30
 *               project:
 *                 type: string
 *                 example: 6857a1b2c3d4e5f678901234
 *               assignedTo:
 *                 type: string
 *                 example: 6857a1b2c3d4e5f678905678
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createTaskSchema),
  taskController.createTask,
);


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get("/", protect, taskController.getTasks);

//get task by project
/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks by project ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       404:
 *         description: Project not found
 */
router.get("/project/:projectId", protect, getTasksByProject);


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", protect, taskController.getTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Create Dashboard UI
 *               description:
 *                 type: string
 *                 example: Build dashboard cards and statistics
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - in-progress
 *                   - completed
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-15
 *               assignedTo:
 *                 type: string
 *                 example: 6857a1b2c3d4e5f678905678
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateTaskSchema),
  taskController.updateTask,
);

/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - in-progress
 *                   - completed
 *                 example: completed
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.patch(
  "/:id/status",
  protect,
  validate(updateTaskStatusSchema),
  taskController.updateTaskStatus,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", protect, authorize("admin"), taskController.deleteTask);

export default router;
