import { StatusCodes } from 'http-status-codes'
import { menuServices } from '~/services/clients/managers/menu'
import ApiError from '~/utils/ApiError'

export const deleteMenuForRestaurant = async (req, res) => {
    try {
        const { t } = req
        const menuId = req.params.menuId
        const userId = req.payload._id
        const data = await menuServices.deleteMenuForRestaurant(
            menuId,
            userId,
            t
        )

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('managers.deleteMenuSuccessfully'),
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
