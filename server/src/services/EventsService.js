import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

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

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
        if (!event) throw new Error(`no event with id: ${eventId}`)
        return event
    }

    async editEvent(eventId, eventData, userId) {
        const eventToEdit = await this.getEventById(eventId)

        if (eventToEdit.creatorId != userId) {
            throw new Forbidden("NO PERMISSION!")
        }
        eventToEdit.name = eventData.name || eventToEdit.name

        eventToEdit.description = eventData.description || eventToEdit.description

        await eventToEdit.save()

        return eventToEdit
    }

    async deleteEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden('NO NO NO!!')
        event.isCanceled = true
        await event.save()
        return `canceled the ${event.name} event`
    }
}

export const eventsService = new EventsService()