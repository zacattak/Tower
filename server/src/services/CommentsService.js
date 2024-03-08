import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class CommentsService {
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getCommentsForEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }

    async deleteComment(commentId, userId) {
        const commentToDestroy = await dbContext.Comments.findById(commentId)
        if (!commentToDestroy) { throw new BadRequest(`invalid id: ${commentId}`) }
        if (commentToDestroy.creatorId != userId) { throw new Forbidden('NO') }
        await commentToDestroy.deleteOne()
        return 'comment was destroyed'
    }
}

export const commentsService = new CommentsService()