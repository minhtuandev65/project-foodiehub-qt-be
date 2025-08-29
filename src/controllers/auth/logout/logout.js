import { StatusCodes } from 'http-status-codes'

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        res.status(StatusCodes.OK).json({ message: 'Success', loggedOut: true })
    } catch (error) {
        next(error)
    }
}
