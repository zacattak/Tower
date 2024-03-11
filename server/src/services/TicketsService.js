import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class TicketsService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        return ticket
    }
    async getTicketsForEvent(userId) {
        const eventTickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return eventTickets
    }

    async getEventTickets(eventId) {
        const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')

        return eventTickets
    }

    async deleteTicket(ticketId, userId) {
        const ticketToDestroy = await dbContext.Tickets.findById(ticketId)

        if (!ticketToDestroy) { throw new BadRequest(`Invalid id: ${ticketId}`) }
        if (ticketToDestroy.accountId != userId) { throw new Forbidden('you cannot delete this') }

        await ticketToDestroy.deleteOne()
        return 'Ticket was destroyed'
    }

    // TODO need a delete ticket
}

export const ticketsService = new TicketsService()