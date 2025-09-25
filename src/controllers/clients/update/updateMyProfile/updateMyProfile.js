import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const updateMyProfile = async (req, res, next) => {
    try {
        const userId = req.payload._id
        const reqData = req.body
        const imageFile = req.file
        const data = await clientsServices.updateMyProfile(userId, reqData, imageFile)
        res.status(StatusCodes.OK).json({
            status: 'Success',
            message: 'Update profile success',
            data
        })
    } catch (error) {
        next(error)
    }
}
