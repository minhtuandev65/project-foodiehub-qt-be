import { StatusCodes } from 'http-status-codes'

export const logout = async (req, res) => {
    try {
        const { t } = req
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('auth.logOutSuccess'),
            loggedOut: true
        })
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: 'error',
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message || 'Internal Server Error'
            })
        }
    }
}
