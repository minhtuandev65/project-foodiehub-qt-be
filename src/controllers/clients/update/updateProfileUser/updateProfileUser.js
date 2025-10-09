import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'
import ApiError from '~/utils/ApiError'

export const updateProfileUser = async (req, res) => {
    try {
        const { t } = req
        const userId = req.payload._id
        const reqData = req.body
        const imageFile = req.file
        const data = await clientsServices.updateProfileUser(
            userId,
            reqData,
            imageFile,
            t
        )

        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('updateProfileSuccess'),
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
