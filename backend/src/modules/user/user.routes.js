import express from "express";
import * as controller from "./user.controller.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/role.constants.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ravi
 *               email:
 *                 type: string
 *                 example: ravi@test.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", authorize(ROLES.ADMIN), controller.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
// router.get("/", protect, authorize("admin"), controller.getUsers);
router.get("/",  controller.getUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
// router.get("/:id", protect, controller.getUser);
router.get("/:id",  controller.getUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, employee]
 *     responses:
 *       200:
 *         description: User updated successfully
 */
// router.put("/:id", protect, authorize("admin"), controller.updateUser);
router.put("/:id", controller.updateUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
// router.delete("/:id", protect, authorize("admin"), controller.deleteUser);
router.delete("/:id",  controller.deleteUser);
export default router;