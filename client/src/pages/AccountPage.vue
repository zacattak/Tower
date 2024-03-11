<template>
  <div class="text-center">
    <!-- <h1></h1> -->
    <img class="rounded" :src="account.picture" />

    <h1>Tickets</h1>
    <!-- TODO show all myTickets -->
    <div v-for="ticket in tickets" :key="ticket.id">
      <p>{{ ticket.event.description }}</p>
      <p>{{ ticket.event.location }}</p>
      <p>{{ ticket.event.startDate }}</p>
      <img :src="ticket.event.coverImg">

      <button @click="deleteTicket(ticket.id)" class="btn btn-success" type="button">Get rid of ticket!</button>

    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';
export default {
  setup() {

    // TODO go get my Tickets
    onMounted(() => {
      getMyEventTickets()
    })

    async function getMyEventTickets() {
      try {
        await ticketsService.getMyEventTickets()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),

      async deleteTicket(ticketId) {
        try {
          const yes = await Pop.confirm()
          if (!yes) return
          await ticketsService.deleteTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
