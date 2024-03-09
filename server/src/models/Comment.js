import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    // id: { type: Schema.ObjectId },
    creatorId: { type: Schema.ObjectId, ref: 'Account' },
    eventId: { type: Schema.ObjectId },
    body: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})