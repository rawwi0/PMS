import express from "express";

import * as projectController from "./project.controller.js";

import validate from "../../middlewares/validate.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "./project.validation.js";

import { protect } from "../../middlewares/auth.middleware.js";

import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - department
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               department:
 *                 type: string
 *               assignedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - ongoing
 *                   - completed
 *               progress:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createProjectSchema),
  projectController.createProject
);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get(
  "/",
  protect,
  projectController.getProjects
);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
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
 *         description: Project details
 */
router.get(
  "/:id",
  protect,
  projectController.getProjectById
);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
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
 *         description: Project updated successfully
 */
router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateProjectSchema),
  projectController.updateProject
);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
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
 *         description: Project deleted successfully
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  projectController.deleteProject
);

export default router;