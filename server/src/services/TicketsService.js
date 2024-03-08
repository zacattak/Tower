import { dbContext } from "../db/DbContext.js"
class TicketsService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)

        // await ticket.populate('profile', 'name ticket')
        return ticket
    }
    async getMyTickets(userId) {
        const myTickets = await dbContext.Tickets.find()
        // { accountId: userId }
        // .populate({
        //     path: 'event',
        //     populate: {
        //         path: 'ticketCount'
        //     }
        // })
        return myTickets
    }

    async getEventTickets(eventId) {
        const eventTickets = await dbContext.Events.find({ eventId }).populate('profile')

        return eventTickets
    }
}

export const ticketsService = new TicketsService()