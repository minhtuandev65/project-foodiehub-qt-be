import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const forgotPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'email is required')
        }
        const reqData = req.body
        const result = await authServices.forgotPassword(reqData)

        res.status(StatusCodes.OK).json({
            message: 'Please check your email to reset your password',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
