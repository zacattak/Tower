<template>

<section class="row">

    <h1 class="text-center">Event Details</h1>

    <div class="col-6">
        <p>{{ event.name }}</p> 
        <img :src="event.coverImg" :alt="event.name" class="img-fluid">
    </div>

</section>

</template>


<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import { eventsService } from '../services/EventsService.js'


export default {
    setup(){
        const route = useRoute()
        onMounted(()=>{
            getEventById()
        })

        async function getEventById(){
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            event: computed (()=>AppState.activeEvent)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>