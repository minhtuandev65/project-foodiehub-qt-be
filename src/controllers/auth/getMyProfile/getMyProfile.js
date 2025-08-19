import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'

export const getMyProfile = async (req, res, next) => {
    try {
        let userId = req.payload._id

        const resultArray = await authServices.getMyProfile(userId)
        const result = resultArray[0]
        const { _id, verifyToken, _destroy, ...data } = result
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
