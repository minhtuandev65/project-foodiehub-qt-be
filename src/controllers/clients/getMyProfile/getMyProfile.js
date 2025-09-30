import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'
import ApiError from '~/utils/ApiError'

export const getMyProfile = async (req, res) => {
    try {
        let userId = req.payload._id

        const resultArray = await clientsServices.getMyProfile(userId)
        const result = resultArray[0]
        const { verifyToken, _destroy, ...data } = result
        res.status(StatusCodes.OK).json({ message: 'Success', data })
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
