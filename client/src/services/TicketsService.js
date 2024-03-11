import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"


class TicketsService {

    async deleteTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('abandoned ticket', response.data)
        const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketId)
        if (ticketIndex == -1) throw new Error("oops")
        AppState.tickets.splice(ticketIndex, 1)
    }
    async createTicket(eventData) {
        const response = await api.post('api/tickets', eventData)
        logger.log('got ticket', response.data)
        AppState.myTickets.push(new Ticket(response.data))
        AppState.activeEvent.attending = true
    }
}

export const ticketsService = new TicketsService()