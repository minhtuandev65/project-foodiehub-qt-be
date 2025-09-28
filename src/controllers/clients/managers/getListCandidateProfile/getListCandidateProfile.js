import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const getListCandidateProfile = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        const data = await clientsServices.getListCandidateProfile(restaurantId)
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Success fetch candidate profile',
            data
        })
    } catch (error) {
        next(error)
    }
}
