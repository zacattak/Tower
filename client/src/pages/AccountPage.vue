<template>
  <div class="text-center">
    <!-- <h1></h1> -->
    <img class="rounded" :src="account.picture" />


    <!-- TODO show all myTickets -->
    <div v-for="ticket in tickets">
      <div>{{ ticket }}</div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {

    // TODO go get my Tickets


    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
