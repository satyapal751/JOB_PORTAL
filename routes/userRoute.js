import express from "express";
import { updateUserController } from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the user
 *           example: John
 *         email:
 *           type: string
 *           description: The updated email of the user
 *           example: johndoe@gmail.com
 *         lastName:
 *           type: string
 *           description: Updated last name of user
 *           example: Doe
 *         location:
 *           type: string
 *           description: Updated location of user
 *           example: Mumbai
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management API
 */

/**
 * @swagger
 * /api/v1/update-user:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserUpdate'
 *       401:
 *         description: Unauthorized, user not logged in
 *       500:
 *         description: Internal server error
 */

router.put("/update-user", userAuth, updateUserController);

export default router;
