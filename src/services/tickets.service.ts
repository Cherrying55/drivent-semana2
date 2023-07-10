import { Ticket } from '@prisma/client';
import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

export async function getTicketsTypesservice(){
    const tipos:TicketType[] = await prisma.ticketType.findMany();
    if (!tipos) throw notFoundError();
    return tipos;

}

export async function getTicketbyUserId(id:number){
  const enroll = await enrollmentRepository.findWithAddressByUserId(id);
  if(!enroll){
    throw(notFoundError())
  };
  const ticket = await getTicketbyEnrollId(enroll.id);
  if(!ticket){
    throw(notFoundError())
  }
  return ticket;

}

export async function getTicketbyEnrollId(id: number){
    return prisma.ticket.findFirst({
        where: { enrollmentId: id },
        include: {
          TicketType: true
        }})
}

export async function getTickettickettype(id: number){
  return prisma.ticket.findFirst({
      where: { id },
      include: {
        TicketType: true
      }})
}

type parainserirticket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;


export async function createTicketonDB(ticket: parainserirticket){
    return prisma.ticket.create({
        data: ticket
      });
}

export async function createTicket(idUser: number, ticketTypeId: number){
    const enroll = await enrollmentRepository.findWithAddressByUserId(idUser);
  if(!enroll){
    throw(notFoundError())
  };
  const novoticket = {
    ticketTypeId,
    enrollmentId: enroll.id,
    status: TicketStatus.RESERVED,
  };

  await createTicketonDB(novoticket);

  const ticket = await getTicketbyEnrollId(enroll.id);
  if(!ticket){
    throw(notFoundError())
  }
  return ticket;

}

export async function getTickeyById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id
    },
    include: {
      Enrollment: true,
    },
  });
}

export async function processarPagamento(id: number) {
  return prisma.ticket.update({
    where: {
      id
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}