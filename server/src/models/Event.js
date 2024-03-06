import { Schema } from "mongoose";

export const EventSchema = new Schema({
    id: { type: Schema.ObjectId, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 15, maxLength: 1000 },
    coverImg: { type: String, required: true },
    location: { type: String, required: true, minLength: 1, maxLength: 500 },
    capacity: { type: Number, required: true, minLength: 1, maxLength: 5000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'convention' }

})

EventSchema.virtual('creator', {
    localField: 'creatorId',

    ref: 'Account',

    foreignField: '_id',


    justOne: true

})

EventSchema.virtual('ticketCount', {
    localField: '_id',

    ref: '',

    foreignField: 'Event',


    count: true

})
