<template>

    <form @submit.prevent="createEvent()">

        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="Event Name"
                minlength="3" maxlength="50" required>
            <label for="name">Name</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.description" type="text" class="form-control" id="description"
                placeholder="Event Description" minlength="3" maxlength="50" required>
            <label for="description">Description</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.startDate" type="text" class="form-control" id="startDate"
                placeholder="Event Start Date" minlength="3" maxlength="50" required>
            <label for="startDate">Start Date</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.capacity" type="text" class="form-control" id="capacity"
                placeholder="Capacity" minlength="1" maxlength="50" required>
            <label for="capacity">Capacity</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.location" type="text" class="form-control" id="location"
                placeholder="location" minlength="1" maxlength="50" required>
            <label for="location">Location</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg"
                placeholder="coverImg" minlength="5" maxlength="1000" required>
            <label for="coverImg">Cover Image</label>
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
import Pop from '../utils/Pop.js'
export default {
    setup() {


        const editableEventData = ref({ name: '', description: '', startDate: '', capacity: '', location: '', coverImg: '', type: 'convention' })

        return {
            editableEventData,
            types: ['concert', 'convention', 'sport', 'digital'],

            async createEvent() {
                try {
                    await eventsService.createEvent(editableEventData.value)
                    editableEventData.value = { name: '', description: '', startDate: '', capacity: '', location: '', coverImg: '', type: 'convention' }
                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped></style>