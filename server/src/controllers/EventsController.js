import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js"
import { ticketsService } from "../services/TicketsService.js";


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.deleteEvent)
            .get('/:eventId/tickets', this.getEventTickets)
    }

    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            eventData.creatorId = request.userInfo.id
            const event = await eventsService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(request, response, next) {
        try {
            const events = await eventsService.getEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventsService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }

    }

    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventData = request.body
            const userId = request.userInfo.id
            const event = await eventsService.editEvent(eventId, eventData, userId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async deleteEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const message = await eventsService.deleteEvent(eventId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService.getEventTickets(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }




}