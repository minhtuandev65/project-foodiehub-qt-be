import { StatusCodes } from 'http-status-codes'

import adminServices from '~/services/admin'
import ApiError from '~/utils/ApiError'

export const acceptCreateOrganization = async (req, res, next) => {
    try {
        const { t } = req
        const organizationId = req.params.organizationId
        const data = await adminServices.acceptCreateOrganization(organizationId, t)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('admin.acceptCreateOrganizationSuccess', {
                organizationName: data.name
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
