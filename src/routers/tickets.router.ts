import { createTicket, getAllTickets, getTicketsTypes } from "@/controllers/tickets.controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";


const ticketsrouter = Router();

ticketsrouter.get("/tickets/types", authenticateToken, getTicketsTypes)
ticketsrouter.get("/tickets", authenticateToken, getAllTickets)
ticketsrouter.post("/tickets", authenticateToken, createTicket)

export default ticketsrouter