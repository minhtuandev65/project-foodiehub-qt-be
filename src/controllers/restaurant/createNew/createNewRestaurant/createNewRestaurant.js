import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/restaurant'

export const createNewRestaurant = async (req, res, next) => {
    try {
        const userId = req.payload._id
        const logoURL = req.files?.logoURL?.[0]
        const businessCertificateImage =
            req.files?.businessCertificateImage?.[0]
        const businessCertificateFile = req.files?.businessCertificateFile?.[0]

        if (typeof req.body.openDays === 'string') {
            req.body.openDays = JSON.parse(req.body.openDays)
        }
        if (typeof req.body.staffIds === 'string') {
            req.body.staffIds = JSON.parse(req.body.staffIds)
        }
        if (typeof req.body.positions === 'string') {
            req.body.positions = JSON.parse(req.body.positions)
        }

        const newOrganizationData = {
            userId,
            logoURL,
            businessCertificateImage,
            businessCertificateFile,
            ...req.body
        }

        const data =
            await restaurantServices.createNewOrganization(newOrganizationData)

        res.status(StatusCodes.CREATED).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
