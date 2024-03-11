import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"


class CommentsService {
    async getCommentsByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('got comments', response.data)
        AppState.comments = response.data.map(commentPOJO => new Comment(commentPOJO))
    }

    async deleteComment(commentId) {
        const response = await api.delete(`api/comments/${commentId}`)
        logger.log('comments are deleting yo!')
    }
    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        logger.log('created comment')
        const newComment = new Comment(response.data)
        AppState.comments.push(newComment)
        return newComment
    }
}

export const commentsService = new CommentsService()