import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const getCandidateProfile = async (req, res, next) => {
    try {
        let organizationId = req.params.organizationId
        const data = await clientsServices.getCandidateProfile(organizationId)
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Success fetch candidate profile',
            data
        })
    } catch (error) {
        next(error)
    }
}
