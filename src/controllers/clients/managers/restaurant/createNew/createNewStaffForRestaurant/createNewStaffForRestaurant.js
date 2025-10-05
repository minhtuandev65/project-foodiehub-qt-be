import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/clients/managers/restaurant'
import ApiError from '~/utils/ApiError'

export const createNewStaffForRestaurant = async (req, res) => {
    try {
        const { t } = req
        const email = req.body.email
        const managerEmail = req.payload.email
        const restaurantId = req.params.restaurantId
        const reqData = req.body
        const addNewStaff = {
            email,
            restaurantId,
            managerEmail,
            ...reqData
        }
        const data =
            await restaurantServices.createNewStaffForRestaurant(addNewStaff, t)

        res.status(StatusCodes.CREATED).json({
            status: t('success'),
            message: t('managers.addNewStaffSuccessfully', {
                email: email
            }),
            data
        })
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: t('error'),
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: t('error'),
                message: error.message || 'Internal Server Error'
            })
        }
    }
}
