import { StatusCodes } from 'http-status-codes'
import { menuModels } from '~/models/clients/manager/menu'
import ApiError from '~/utils/ApiError'

export const deleteMenuForRestaurant = async (menuId, userId, t) => {
    
    const existMenu = await menuModels.findMenuById(menuId)
    
    if (!existMenu)
        throw new ApiError(StatusCodes.NOT_FOUND, t('managers.menuNotFound'))

    const newUpdateData = {
        _destroy: true,
        userId
    }

    const result = await menuModels.updateMenu(
        String(existMenu._id),
        newUpdateData
    )

    return result
}
