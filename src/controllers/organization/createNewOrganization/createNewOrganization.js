import { StatusCodes } from 'http-status-codes'
import { organizationServices } from '~/services/organization'

export const createNewOrganization = async (req, res, next) => {
    try {
        if (!req.payload || !req.payload._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Unauthorized: Missing user info'
            })
        }
        const userId = req.payload._id
        const logoURL = req.file
        const newOrganizationData = { userId, logoURL, ...req.body }
        const data =
            await organizationServices.createNewOrganization(
                newOrganizationData
            )

        res.status(StatusCodes.CREATED).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
