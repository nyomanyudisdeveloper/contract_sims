import express from 'express'
import { getBanners, getServices } from '../controllers/informationController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const routes = express.Router()

/**
 * @swagger
 * /banner:
 *   get:
 *     summary:  Get Banners
 *     tags:
 *        - 2. Module Information
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.get("/banner",verifyToken,getBanners)

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get Servicesr
 *     tags:
 *        - 2. Module Information
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     responses:
 *       200:
 *         description: Create new user success
 *       401:
 *         description: Invalid data body
 *       400:
 *         description: This request required body username, password, and role
 *       500:
 *         description: Internal Server Error
 */
routes.get("/services",verifyToken,getServices)
export default routes