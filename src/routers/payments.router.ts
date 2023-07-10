import { getPaymentsbyTicketId, postPaymentProcess } from "@/controllers/payments.controller";
import { Router } from "express";

const paymentsrouter = Router();


paymentsrouter.get("/payments", getPaymentsbyTicketId);
paymentsrouter.post("/payments/process", postPaymentProcess);


export default paymentsrouter;