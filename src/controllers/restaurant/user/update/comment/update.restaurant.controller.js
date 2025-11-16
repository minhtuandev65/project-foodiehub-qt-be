import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const comment = async (req, res) => {
    try {
        const { t } = req
        const userId = req.payload._id
        const commentId= req.params.commentId
        const newData = {
            ...req.body,
            commentId,
            userId: userId
        }

        const data = await services.restaurant.user.update.comment(
            newData,
            t
        )

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('managers.updateRestaurantSuccessfully'),
            data
        })
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: 'error',
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message || 'Internal Server Error'
            })
        }
    }
}
