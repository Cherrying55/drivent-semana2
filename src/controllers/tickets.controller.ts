
import { Request, Response } from "express";
import { getTicketbyUserId, getTicketsTypesservice } from "@/services/tickets.service";
import httpStatus from "http-status";
import { createTicket as create } from "@/services/tickets.service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketsTypes (req:Request, res:Response){

    try{
        const tipos = await getTicketsTypesservice();
        return res.status(httpStatus.OK).send(tipos);
    }
    catch(e){
        return res.sendStatus(500);
    }
}

export async function getAllTickets(req:AuthenticatedRequest, res:Response){
    const {userId} = req;
    try {
        const ticket = await getTicketbyUserId(userId);
        return res.status(httpStatus.OK).send(ticket);
      } catch (e) {
        return res.sendStatus(500);
      }


}

export async function createTicket(req:AuthenticatedRequest, res:Response){
    const {userId} = req;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId){
    return res.sendStatus(400);
  }

  try {
    const ticket = await create(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (e) {
    return res.sendStatus(500);
  }
}
