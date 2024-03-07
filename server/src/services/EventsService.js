import { dbContext } from "../db/DbContext.js"

class EventsService {
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        // await event.populate('creator', 'name creator')
        return event
    }

    async getEvents() {
        const events = await dbContext.Events.find()
        return events
    }
}

export const eventsService = new EventsService()