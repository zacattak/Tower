import { dbContext } from "../db/DbContext.js"
class TicketsService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        return ticket
    }
    async getMyTickets(userId) {
        const myTickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return myTickets
    }

    async getEventTickets(eventId) {
        const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')

        return eventTickets
    }

    // TODO need a delete ticket
}

export const ticketsService = new TicketsService()