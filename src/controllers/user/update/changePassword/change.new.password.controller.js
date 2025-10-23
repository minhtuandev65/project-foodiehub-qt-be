import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const changeNewPassword = async (req, res) => {
    try {
        const { t } = req
        let userId = req.payload._id
        const reqData = { userId, ...req.body }
        const data = await services.user.action.changeNewPassword(reqData, t)
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('successChangePassword', {
                email: data.email
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
