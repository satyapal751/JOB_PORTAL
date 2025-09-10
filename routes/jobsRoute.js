import express from "express";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  jobStatsController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated Job ID
 *           example: "64f9a4b8c9d1f23456789abc"
 *         company:
 *           type: string
 *           description: Company name
 *           example: "Google"
 *         position:
 *           type: string
 *           description: Job position/title
 *           example: "Software Engineer"
 *         status:
 *           type: string
 *           description: Job status (e.g., pending, interview, declined)
 *           example: "pending"
 *         createdBy:
 *           type: string
 *           description: User ID who created the job
 *           example: "64f9a4b8c9d1f23456789xyz"
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * /api/v1/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create-job", userAuth, createJobController);

/**
 * @swagger
 * /api/v1/get-job:
 *   get:
 *     summary: Get all jobs for logged-in user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
 */
router.get("/get-job", userAuth, getAllJobsController);

/**
 * @swagger
 * /api/v1/update-job/{id}:
 *   patch:
 *     summary: Update job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */
router.patch("/update-job/:id", userAuth, updateJobController);

/**
 * @swagger
 * /api/v1/delete-job/{id}:
 *   delete:
 *     summary: Delete job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
router.delete("/delete-job/:id", userAuth, deleteJobController);

/**
 * @swagger
 * /api/v1/job-stats:
 *   get:
 *     summary: Get jobs stats for logged-in user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics
 *       500:
 *         description: Internal server error
 */
router.get("/job-stats", userAuth, jobStatsController);

export default router;
