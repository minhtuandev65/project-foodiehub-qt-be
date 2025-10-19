import { StatusCodes } from "http-status-codes"
import ApiError from "~/utils/ApiError"

export const detail = async (req, res) => {
    try {
        
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: 'error',
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: t('error'),
                message: error.message || 'Internal Server Error'
            })
        }
    }
}