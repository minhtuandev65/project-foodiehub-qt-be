import { menuModels } from '~/models/clients/manager/menu'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const updateMenu = async (menuData, t) => {
    const { userId, menuId, imageURL, ...rest } = menuData
    const existMenu = await menuModels.findMenuById(menuId)
    if (!existMenu) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('managers.menuNotFound'))
    }

    let uploadResultImage = null
    if (imageURL) {
        uploadResultImage = await CloudStorageProvider.uploadImageToS3(
            imageURL,
            'image-menu'
        )
    }
    let newUpdateData = {
        userId,
        ...rest
    }
    if (uploadResultImage != null) {
        newUpdateData = {
            imageURL: uploadResultImage,
            userId,
            ...rest
        }
    }

    const result = await menuModels.updateMenu(
        String(existMenu._id),
        newUpdateData
    )
    return result
}
