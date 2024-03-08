import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"


class EventsService {

    async getEvents() {
        const response = await api.get('api/events')
        logger.log('getting events', response.data)
        AppState.events = response.data.map(event => new Event(event))
    }
}

export const eventsService = new EventsService()