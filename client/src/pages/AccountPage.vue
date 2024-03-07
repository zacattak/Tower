<template>
  <div class="text-center">
  <!-- <h1></h1> -->
    <img class="rounded" src="src/assets/img/horse.jpg" />
  
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
