import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const list = async (req, res) => {
    console.log(req)
    try {
        const { t } = req
        const filter={
            page:req.query.page,
            limit: req.query.limit
        }
        const data = await services.restaurant.user.data.list(filter)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('managers.getListRestaurantSuccessfully'),
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
