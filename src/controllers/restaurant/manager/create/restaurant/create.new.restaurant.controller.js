import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const restaurant = async (req, res) => {
    try {
        const { t } = req
        const userId = req.payload._id

        const files = JSON.parse(JSON.stringify(req.files))
        const logoURL = files.logoURL?.[0]
        const businessCertificateImage = files.businessCertificateImage?.[0]
        const businessCertificateFile = files.businessCertificateFile?.[0]

        if (typeof req.body.openDays === 'string') {
            req.body.openDays = JSON.parse(req.body.openDays)
        }
        if (typeof req.body.staffIds === 'string') {
            req.body.staffIds = JSON.parse(req.body.staffIds)
        }
        if (req.body.categories && typeof req.body.categories === 'string') {
            req.body.categories = JSON.parse(req.body.categories)
        }
        const newRestaurantData = {
            userId,
            logoURL,
            businessCertificateImage,
            businessCertificateFile,
            ...req.body
        }

        const data =
            await services.restaurant.manager.create.restaurant(
                newRestaurantData
            )

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('managers.createNewRestaurantSuccessfully'),
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
