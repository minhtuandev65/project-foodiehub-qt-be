import { StatusCodes } from 'http-status-codes'

import adminServices from '~/services/admin'
import ApiError from '~/utils/ApiError'

export const assignRoleToUser = async (req, res, next) => {
    try {
        const { t } = req
        const data = await adminServices.assignRoleToUser(req.body, t)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('user.assignRoleSuccess', {
                role: req.body.role.toUpperCase(),
                email: req.body.email
            }),
            data
        })
    } catch (error) {
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
