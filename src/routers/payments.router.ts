import { getPaymentsbyTicketId, postPaymentProcess } from "@/controllers/payments.controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const paymentsrouter = Router();


paymentsrouter.get("/payments", authenticateToken, getPaymentsbyTicketId);
paymentsrouter.post("/payments/process", authenticateToken, postPaymentProcess);


export default paymentsrouter;