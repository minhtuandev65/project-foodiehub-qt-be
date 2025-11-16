import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'
import { ROLE } from '~/utils/constants'

export const comment = async (commentId, userId, t) => {
    const existComment = await models.restaurant.find.commentId(commentId)

    if (!existComment)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.notFoundComment'))

    if(existComment.userId!= userId)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.notPermissionDeleteComment'))

    const result = await models.restaurant.user.deleting.comment(
        commentId, userId
    )

    return result
}
