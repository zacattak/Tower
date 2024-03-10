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
    async getEventById(eventId) {
        AppState.activeEvent = null
        const response = await api.get(`api/events/${eventId}`)
        logger.log('get event by id', response.data)
        AppState.activeEvent = new Event(response.data)
    }
    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        logger.log('CREATED EVENT', response.data)
        AppState.events.push(new Event(response.data))
    }
}

export const eventsService = new EventsService()