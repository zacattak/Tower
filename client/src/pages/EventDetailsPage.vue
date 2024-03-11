<template>

    <section class="row" v-if="event">

        <h1 class="text-center">Event Details</h1>


        <div v-if="event.isCanceled">
            This event has been canceled
        </div>

        <div class="text-center" v-if="!event.isCanceled && account.id == event.creatorId">
            <!-- TODO allow me to cancel the event -->

            <button @click="deleteEvent()" class="btn btn-success" type="button" :disabled="event.isCanceled">
                <i class="mdi mdi-close-circle me-1"></i>delete event
            </button>


        </div>

        <div class="text-center" v-if="!event.attending">
            <!-- TODO need a button to get a ticket -->
            <button @click="createTicket()" class="btn btn-success" type="button" :disabled="event.isCanceled">
                <i class="mdi mdi-close-circle me-1"></i>Get ticket!
            </button>
        </div>

        <!-- <div>
            <button @click="deleteTicket()" class="btn btn-success" type="button">Get rid of ticket!</button>
        </div> -->

        <!-- <li v-if="event.creatorId == account.id">
            <button @click="deleteEvent()" class="btn btn-success" type="button" :disabled="event.isCanceled">
                <i class="mdi mdi-close-circle me-1"></i>delete event
            </button>
        </li> -->





        <div class="col-6">
            <p :class="{ 'text-danger': event.attending }">{{ event.name }}</p>

            <p>Attending Event? {{ event.attending }}</p>

            <p>Tickets: {{ event.ticketCount }}/{{ event.capacity }}</p>
            <img :src="event.coverImg" :alt="event.name" class="img-fluid">
            <p>{{ event.description }}</p>
            <p>{{ event.location }}</p>
            <p>{{ event.startDate }}</p>
            <p>{{ event.type }}</p>
        </div>
        <div class="col-6">

        </div>

        <div v-for="ticket in tickets">
            TICKET HOLDERS:
            <p>{{ ticket.profile.name }}</p>
            <img :src="ticket.profile.picture">

        </div>


        <div v-for="comment in comments" :key="comment.id">
            Comment Author: {{ comment.creator.name }},
            Body: {{ comment.body }},
            <img :src="comment.creator.picture">
            <button @click="deleteComment(comment.id)">DELETE COMMENT</button>
        </div>

        <form @submit.prevent="createComment()">

            <!-- <div class="form-floating mb-3">
                <input v-model="editableCommentData.creator" type="text" class="form-control" id="creator"
                    placeholder="Comment" minlength="3" maxlength="50" required>
                <label for="creator">Name</label>
            </div> -->

            <div class="form-floating mb-3">
                <input v-model="editableCommentData.body" type="text" class="form-control" id="body"
                    placeholder="Comment Body" minlength="3" maxlength="50" required>
                <label for="body">Body</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <!-- TODO get and show comments -->

    </section>

</template>


<script>
import { AppState } from '../AppState.js'

import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService.js'
import { ticketsService } from '../services/TicketsService.js'
import { commentsService } from '../services/CommentsService.js'
import Pop from '../utils/Pop'


export default {
    setup() {
        const editableCommentData = ref({ creator: '', body: '', eventId: '' })
        const route = useRoute()
        onMounted(() => {
            getEventById()
            getTicketsByEventId()
            getCommentsByEventId()

        })

        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getTicketsByEventId() {
            try {
                await ticketsService.getTicketsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getCommentsByEventId() {
            try {
                await commentsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        // async function getMyEventTickets() {
        //     try {
        //         await ticketsService.getMyEventTickets()
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }

        return {
            // route,
            editableCommentData,
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),

            // myTickets: computed(() => AppState.myTickets),


            // attending: computed(())
            // TODO isSoldOut == ticketCount compared to the event capacity
            async createTicket() {
                try {
                    const eventData = { eventId: route.params.eventId }
                    await ticketsService.createTicket(eventData)
                } catch (error) {
                    Pop.error(error)
                }
            },
            async deleteEvent() {
                try {
                    const event = AppState.activeEvent
                    const wantsToDelete = await Pop.confirm('Are you sure?')
                    if (!wantsToDelete) { return }
                    await eventsService.deleteEvent(event.id)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async deleteTicket(myTicketId) {
                try {
                    const yes = await Pop.confirm()
                    if (!yes) return
                    await ticketsService.deleteTicket(myTicketId)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async deleteComment(commentId) {
                try {
                    const yes = await Pop.confirm

                    if (!yes) return
                    await commentsService.deleteComment(commentId)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async createComment() {
                try {
                    const commentData = editableCommentData.value
                    const eventId = route.params.eventId
                    commentData.eventId = eventId.toString()
                    await commentsService.createComment(commentData)

                } catch (error) {
                    Pop.error(error)
                }
            }











        }


    }
}
</script>


<style lang="scss" scoped></style>