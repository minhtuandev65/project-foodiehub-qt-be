import { StatusCodes } from 'http-status-codes'
import { organizationServices } from '~/services/organization'

export const createNewOrganization = async (req, res, next) => {
    try {
        const userId = req.payload._id
        const logoURL = req.files?.logoURL?.[0]
        const businessCertificateImage =
            req.files?.businessCertificateImage?.[0]
        const businessCertificateFile = req.files?.businessCertificateFile?.[0]

        const newOrganizationData = {
            userId,
            logoURL,
            businessCertificateImage,
            businessCertificateFile,
            ...req.body
        }
        const data =
            await organizationServices.createNewOrganization(
                newOrganizationData
            )

        res.status(StatusCodes.CREATED).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
