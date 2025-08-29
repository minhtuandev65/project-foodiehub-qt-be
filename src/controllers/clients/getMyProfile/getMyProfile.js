import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'

export const getMyProfile = async (req, res, next) => {
    try {
        let userId = req.payload._id

        const resultArray = await clientsServices.getMyProfile(userId)
        const result = resultArray[0]
        const { _id, verifyToken, _destroy, ...data } = result
        res.status(StatusCodes.OK).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
