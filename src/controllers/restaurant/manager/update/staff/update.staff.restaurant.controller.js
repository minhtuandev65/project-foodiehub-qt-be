import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const staff = async (req, res) => {
    try {
        const { t } = req
        const staffId = req.params.staffId
        const updateData = {
            staffId,
            ...req.body
        }
        const data = await services.restaurant.manager.update.staff(
            updateData,
            t
        )

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('Cập nhật thành công'),
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
