import express from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { validateTopUpAmount } from "../middleware/membershipMiddleware.js"
import { topUp, transaction } from "../controllers/transactionController.js"
import { validateServiceID } from "../middleware/transactionMiddleware.js"

const routes = express.Router()

/**
 * @swagger
 * /topup:
 *   post:
 *     summary: Create new user 
 *     tags:
 *        - 3. Module Transaction
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
 *                      top_up_amount:
 *                          type: int
 *                          description: amount
 *                          example: 10000
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
routes.post("/topup",verifyToken,validateTopUpAmount,topUp)

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create new Transaction
 *     tags:
 *        - 3. Module Transaction
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
 *                      service_id:
 *                          type: int
 *                          description: service_id
 *                          example: 1
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
routes.post("/transaction",verifyToken,validateServiceID,transaction)

routes.get("/transaction/history",verifyToken,)

export default routes