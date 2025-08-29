import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const changePassword = async (req, res, next) => {
    try {
        let userId = req.payload._id
        const reqData = { userId, ...req.body }
        const data = await clientsServices.changePassword(reqData)
        res.status(StatusCodes.OK).json({
            message: 'Success change password',
            data
        })
    } catch (error) {
        next(error)
    }
}
