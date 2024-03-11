import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class EventsService {
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('ticketCount')
        await event.populate('creator', 'name picture')
        return event
    }

    async getEvents() {
        const events = await dbContext.Events.find().populate('creator', 'name picture').populate('ticketCount')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture').populate('ticketCount')
        if (!event) throw new Error(`no event with id: ${eventId}`)
        return event
    }

    async editEvent(eventId, eventData, userId) {
        const eventToEdit = await this.getEventById(eventId)

        // TODO do not allow me to edit the event if the event has been canceled

        if (eventToEdit.creatorId != userId) {
            throw new Forbidden("You can't edit this event because its not yours")
        }
        eventToEdit.name = eventData.name || eventToEdit.name

        eventToEdit.description = eventData.description || eventToEdit.description

        await eventToEdit.save()

        return eventToEdit
    }

    async deleteEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != userId) { throw new Forbidden('no permission') }
        event.isCanceled = true
        await event.save()
        return `canceled the ${event.name} event`
    }
    // async getTicket(eventId, userId) {
    //     const event = await this.getEventById(eventId)
    //     // if (event.creatorId != userId) throw new Forbidden
    //     event.attending = true
    //     await event.save()
    //     return 'attending event'
    // }
}

export const eventsService = new EventsService()