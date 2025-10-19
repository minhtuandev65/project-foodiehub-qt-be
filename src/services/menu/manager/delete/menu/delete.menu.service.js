import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const menu = async (menuId, userId, t) => {
    const existMenu = await models.menu.find.id(menuId)

    if (!existMenu)
        throw new ApiError(StatusCodes.NOT_FOUND, t('managers.menuNotFound'))

    const newUpdateData = {
        _destroy: true,
        userId
    }

    const result = await models.menu.manager.deleting(
        String(existMenu._id),
        newUpdateData
    )

    return result
}
