import { createTicket, getAllTickets, getTicketsTypes } from "@/controllers/tickets.controller";
import { Router } from "express";


const ticketsrouter = Router();

ticketsrouter.get("/tickets/type", getTicketsTypes)
ticketsrouter.get("/tickets", getAllTickets)
ticketsrouter.post("/tickets", createTicket)

export default ticketsrouter