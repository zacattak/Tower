import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    id: { type: Schema.ObjectId },
    accountId: { type: Schema.ObjectId },
    eventId: { type: Schema.ObjectId }
})

TicketSchema.virtual('profile', {
    localField: 'accountId',

    ref: ''

    foreignField: '_id',



    justOne: ''
}
)

