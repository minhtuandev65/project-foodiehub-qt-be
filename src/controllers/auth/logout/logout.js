import { StatusCodes } from 'http-status-codes'

export const logout = async (req, res, next) => {
    try {
        const { t } = req
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('auth.logOutSuccess'),
            loggedOut: true
        })
    } catch (error) {
        next(error)
    }
}
