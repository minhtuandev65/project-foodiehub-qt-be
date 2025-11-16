import { StatusCodes } from 'http-status-codes'
import { t } from 'i18next'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const detail = async (tableId) => {
    const existTable = await models.table.find.id(tableId)
    if (!existTable) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    }
    const result = await models.table.data.detail(tableId)

    const createdAt = new Date(result.createdAt).toLocaleDateString('vi-VN')

    const data = {
        ...result,
        createdAt
    }
    return data
}
