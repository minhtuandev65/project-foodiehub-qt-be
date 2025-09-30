import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'
import ApiError from '~/utils/ApiError'

export const getListCandidateProfile = async (req, res) => {
    try {
        const { t } = req
        const restaurantId = req.params.restaurantId
        const data = await clientsServices.getListCandidateProfile(restaurantId)

        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('managers.getListCandidateProfileSuccessfully'),
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
