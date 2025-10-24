import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const table = async (req, res) => {
    try {
        const { t } = req
        const tableId = req.body._id
        const imageURL = req.file
        const tableRequest = {
            ...req.body,
            tableId,
            imageURL
        }

        const data = await services.table.manager.update.table(
            tableRequest,
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
