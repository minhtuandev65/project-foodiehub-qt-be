import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const assignRoleToUser = async (req, res) => {
    try {
        const { t } = req
        const data = await services.admin.action.assignRoleToUser(req.body, t)
        
        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: 'Chuyển đổi vai trò thành công',
            data
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
