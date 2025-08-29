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

        const result = await authServices.resetNewPassword({
            newPassword: req.body.password,
            token: req.query.token
        })
        const { token, ...data } = result
        res.status(StatusCodes.OK).json({ message: 'Success', data })
    } catch (error) {
        next(error)
    }
}
