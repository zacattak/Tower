import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    id: { type: Schema.ObjectId, required: true },
    creatorId: { type: Schema.ObjectId, required: true },
    eventId: { type: Schema.ObjectId, required: true },
    body: { type: String, required: true },
})

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true

})