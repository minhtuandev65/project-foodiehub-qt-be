import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const forgotPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'email is required')
        }
        const result = await authServices.forgotPassword({
            email: req.body.email
        })

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}
