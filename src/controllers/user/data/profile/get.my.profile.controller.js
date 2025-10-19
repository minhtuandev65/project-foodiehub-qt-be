import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const getMyProfile = async (req, res) => {
    try {
        let userId = req.payload._id

        const resultArray = await services.user.data.getMyProfile(userId)
        const result = resultArray[0]
        const { verifyToken, _destroy, ...data } = result
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('user.getMyProfileSuccessfully'),
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
