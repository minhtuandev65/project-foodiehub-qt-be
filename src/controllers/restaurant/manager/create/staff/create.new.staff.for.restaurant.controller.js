import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const staff = async (req, res) => {
    try {
        const { t } = req
        console.log(req.payload)
        const email = req.body.email
        const managerEmail = req.payload.email
        const fullName= req.payload.fullName
        const restaurantId = req.params.restaurantId
        const reqData = req.body
        const addNewStaff = {
            email,
            restaurantId,
            managerEmail,
            fullName,
            ...reqData
        }
        const data = await services.restaurant.manager.create.staff(
            addNewStaff,
            t
        )

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('managers.addNewStaffSuccessfully', {
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
