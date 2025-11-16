/* Controller */
import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const bookTable = async (req, res) => {
    try {
        const { t } = req
        const userId = req.payload._id
        const restaurantId = req.params.restaurantId

        const newData = {
            userId,
            restaurantId,
            ...req.body
        }

        const data = await services.bookTable.create.bookTable(newData, t)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('successfully'),
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
