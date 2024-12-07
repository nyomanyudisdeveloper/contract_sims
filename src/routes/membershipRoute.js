import express from 'express'
import { registration } from '../controllers/membershipController.js'

const routes = express.Router()

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Create new user 
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: Create new user with email, password, and role [admin,cs,supervisor]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      password:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
 *                      first_name:
 *                          type: string
 *                          description: The user role 
 *                          example: admin
 *                      last_name:
 *                          type: string
 *                          description: The user role 
 *                          example: admin
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
routes.post("/registration",registration)

export default routes