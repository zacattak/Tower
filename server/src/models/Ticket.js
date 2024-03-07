import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    id: { type: Schema.ObjectId },
    accountId: { type: Schema.ObjectId, ref: 'Account' },
    eventId: { type: Schema.ObjectId, ref: 'Event' }
}, { timestamps: true, toJSON: { virtuals: true } })


// TicketSchema.virtual('profile', {
//     localField: 'accountId',

//     ref: ''

//     foreignField: '_id',



//     justOne: ''
// }
// )

