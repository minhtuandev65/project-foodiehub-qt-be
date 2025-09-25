import { StatusCodes } from 'http-status-codes'
import { organizationServices } from '~/services/organization'

export const updateOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.organizationId
        const userId = req.payload._id
        const logoURL = req.file
        const organizationData = {
            ...req.body,
            organizationId,
            logoURL
        }

        const data = await organizationServices.updateOrganization({
            userId,
            organizationData
        })

        res.status(StatusCodes.OK).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
