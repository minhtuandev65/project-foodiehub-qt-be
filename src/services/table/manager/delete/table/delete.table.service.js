import { StatusCodes } from 'http-status-codes'
import { t } from 'i18next'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const table = async (tableId) => {
    const existMenu = await models.table.find.id(tableId)

    if (!existMenu)
        throw new ApiError(StatusCodes.NOT_FOUND, t('managers.menuNotFound'))

    const result = await models.table.manager.deleting.table(tableId)

    return result
}
