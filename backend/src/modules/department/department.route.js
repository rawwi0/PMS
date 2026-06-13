import express from "express";

import * as controller from "./department.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management APIs
 */

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Department name 
 *               description:
 *                 type: string
 *                 example: Small Info About Department
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", controller.createDepartment);

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: Departments fetched successfully
 */
router.get("/", controller.getDepartments);

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get single department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department fetched successfully
 *       404:
 *         description: Department not found
 */
router.get("/:id", controller.getDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update department
 *     tags: [Departments]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 */
router.put("/:id", controller.updateDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted successfully
 */
router.delete("/:id", controller.deleteDepartment);

export default router;