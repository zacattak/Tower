import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js"


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
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




}