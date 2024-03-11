const { logger } = require("../utils/Logger")
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"


class TicketsService {
    async createTicket(eventData) {
        const response = await api.post('api/tickets', eventData)
        logger.log('got ticket', response.data)
        AppState.myTickets.push(new Ticket(response.data))
    }
}

export const ticketsService = new TicketsService()