import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const resetNewPassword = async (req, res, next) => {
    try {
        if (!req.query.token) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'token is required')
        }

        if (!req.body.password || req.body.password?.length < 7) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'Password is required, must be at least 7 characters'
            )
        }
        const reqData = req.payload
        const data = await authServices.resetNewPassword(reqData)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Password changed successfully',
            data
        })
    } catch (error) {
        next(error)
    }
}
