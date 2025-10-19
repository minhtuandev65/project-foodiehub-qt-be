import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const menu = async (menuData, t) => {
    const { userId, menuId, imageURL, ...rest } = menuData
    const existMenu = await models.menu.find.id(menuId)
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

    const result = await models.menu.manager.update.menu(
        String(existMenu._id),
        newUpdateData
    )
    return result
}
