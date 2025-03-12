import express from "express";
import {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} from "../Controllers/paymentController.js";
import { authenticateToken } from "../Middleware/auth.js";
 
const router = express.Router();
 
router.post("/", authenticateToken ,createPayment);
router.get("/", authenticateToken ,getAllPayments);
router.get("/:id",authenticateToken , getPaymentById);
router.put("/:id",authenticateToken , updatePayment);
router.delete("/:id",authenticateToken , deletePayment);

 
export default router;