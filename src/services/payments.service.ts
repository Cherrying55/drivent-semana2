import { Request, Response } from "express";
import { prisma } from "@/config";
import { getTickettickettype, getTickeyById, processarPagamento } from "./tickets.service";
import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

export  async function getPaymentById(id: number) {
  return prisma.payment.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getPaymentsbyTicketId(idUser: number, idTicket: number){

    const ticket = await getTickeyById(idTicket);
  if (!ticket){
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.getById(ticket.enrollmentId);
  if (!enrollment){
    throw notFoundError();}

   const match = enrollment.userId !== idUser;
   if(!match){
    throw unauthorizedError();
   }

   //verificado

   const pagamento = await getPaymentById(idTicket)
   if(!pagamento){
    throw notFoundError();
   }
   else{
    return pagamento
   }

}

export async function createPaymentonDB(id: number, dados: any) {
    return prisma.payment.create({
      data: {
        id,
        ...dados,
      },
    });
  }

export async function postPaymentProcess(idTicket:number, idUser:number, dados:any){

    const ticketver = await getTickeyById(idTicket);
    if (!ticketver){
      throw notFoundError();
    }
  
    const enrollment = await enrollmentRepository.getById(ticketver.enrollmentId);
    if (!enrollment){
      throw notFoundError();}
  
     const match = enrollment.userId !== idUser;
     if(!match){
      throw unauthorizedError();
     }

     const ticket = await getTickettickettype(idTicket);
     
     const dadosdopagamento = {
        ticketId: idTicket,
        value: ticket.TicketType.price,
        cardLastDigits: dados.number.toString().slice(-4),
        cardIssuer: dados.issuer,
      };

      const payment = await createPaymentonDB(idTicket, dadosdopagamento);

      const update = await processarPagamento(idTicket);

      return payment;
    

}