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
}

export const commentsService = new CommentsService()