import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const getCvUser = async (req, res, next) => {
    try {
        let userId = req.params.userId
        const data = await clientsServices.getCvUser(userId)
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Success change password',
            data
        })
    } catch (error) {
        next(error)
    }
}
