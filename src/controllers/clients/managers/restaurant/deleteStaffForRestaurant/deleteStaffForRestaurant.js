import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/clients/managers/restaurant'
import ApiError from '~/utils/ApiError'

export const deleteStaffForRestaurant = async (req, res) => {
    try {
        const { t } = req
        const staffId = req.params.staffId
        console.log(staffId)
        const data = await restaurantServices.deleteStaffForRestaurant(
            staffId,
            t
        )
        const email = data.email
        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('managers.deleteStaffSuccessfully', {
                email: email
            }),
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
