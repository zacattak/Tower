import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"


class TicketsService {

    async deleteTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('abandoned ticket', response.data)
        const myTicketIndex = AppState.myTickets.findIndex(ticket => ticket.id == ticketId)
        if (myTicketIndex == -1) throw new Error("oops")
        AppState.myTickets.splice(myTicketIndex, 1)
    }
    async createTicket(eventData) {
        const response = await api.post('api/tickets', eventData)
        logger.log('got ticket', response.data)
        AppState.myTickets.push(new Ticket(response.data))
        AppState.activeEvent.attending = true
    }
    async getMyEventTickets() {
        const response = await api.get('account/tickets')
        logger.log('got my tickets', response.data)
        const myTickets = response.data.map(pojo => new Ticket(pojo))
        AppState.myTickets = myTickets
    }
    async getTicketsByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('got tickets', response.data)
        const newTickets = response.data.map(pojo => new Ticket(pojo))
        AppState.tickets = newTickets
    }

}

export const ticketsService = new TicketsService()