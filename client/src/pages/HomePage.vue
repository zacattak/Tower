<template>
  <section class="row my-2 g-2">
    <h1 class="text-center">Fun Events</h1>
    <div class="col-12 d-flex justify-content-between"></div>
    <button v-for="type in types" :key="type" @click="changeFilterTerm(type)">
      {{ type }}
    </button>

    <!-- TODO filterEvents  -->
    <EventForm />

    <div v-for="event in events" :key="event.id" class="col-6 col-md-4">

      <RouterLink :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <div v-if="event.isCanceled">
          This event has been canceled
        </div>
        <div class="border shadow bg-info">
          <img :src="event.coverImg" class="event-magic" :alt="`cover image ${event.name}`">
          <div class="text-light text-center fw-bold p-2">
            {{ event.name }}
          </div>
          <div class="text-light text-center fw-bold p-2" :title="event.ticketCount + ' people w/ tickets'">
            <i class="mdi mdi-ticket"></i>{{ event.ticketCount }}
          </div>
        </div>

      </RouterLink>
    </div>

  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService.js'
import Pop from '../utils/Pop';
// import { Event } from '../models/Event';

export default {
  setup() {
    const filterTerm = ref('all')
    // TODO create Event Form


    onMounted(() => { getEvents() })
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filterTerm,
      changeFilterTerm(term) {
        filterTerm.value = term
      },
      types: ['all', 'concert', 'convention', 'sport', 'digital'],
      events: computed(() => {
        if (filterTerm.value == 'all') {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.type == filterTerm.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.event-magic {
  height: 20vh;
  width: 100%;
  object-position: center;
  object-fit: cover;
}
</style>
