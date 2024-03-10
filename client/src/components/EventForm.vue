<template>

    <form @submit.prevent="createEvent()">

        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="Event Name"
                minlength="3" maxlength="50" required>
            <label for="name">Name</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg"
                placeholder="coverImg" minlength="5" maxlength="1000" required>
            <label for="coverImg">coverImg</label>
        </div>

        <div class="form-floating mb-3">
            <select v-model="editableEventData.type" class="form-select" id="type"
                aria-label="Floating label select example">
                <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
            </select>
            <label for="type">Type</label>
        </div>

        <div class="text-end">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>

</template>


<script>
import { ref } from 'vue'
import { eventsService } from '../services/EventsService.js'
import Pop from 'utils/Pop.js'
export default {
    setup() {


        const editableEventData = ref({})

        return {
            editableEventData,
            categories: ['concert', 'convention', 'sport', 'digital'],

            async createEvent() {
                try {
                    await eventsService.createEvent(editableEventData.value)
                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped></style>