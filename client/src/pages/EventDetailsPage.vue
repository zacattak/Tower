<template>

    <section class="row" v-if="event">

        <h1 class="text-center">Event Details</h1>


        <div v-if="event.isCanceled">
            This event has been canceled
        </div>

        <div v-if="!event.isCanceled && account.id == event.creatorId">
            <!-- TODO allow me to cancel the event -->
        </div>

        <div v-if="!event.isCanceled">
            <!-- TODO need a button to get a ticket -->
        </div>





        <div class="col-6">
            <p>{{ event.name }}</p>


            <p>Tickets: {{ event.ticketCount }}/{{ event.capacity }}</p>
            <img :src="event.coverImg" :alt="event.name" class="img-fluid">
            <p>{{ event.description }}</p>
            <p>{{ event.location }}</p>
            <p>{{ event.startDate }}</p>
            <p>{{ event.type }}</p>
        </div>
        <div class="col-6">

        </div>





        <!-- TODO get and show comments -->

    </section>

</template>


<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop'


export default {
    setup() {
        const route = useRoute()
        onMounted(() => {
            getEventById()
        })

        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            // TODO isSoldOut == ticketCount compared to the event capacity
        }
    }
}
</script>


<style lang="scss" scoped></style>