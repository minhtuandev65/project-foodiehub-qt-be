import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'
import { checkIsOpenRestaurant } from '~/utils/checkIsOpenRestaurant'

export const detail = async (restaurantId) => {
    const existRestaurant = await models.restaurant.find.id(restaurantId)
    if (!existRestaurant) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    }
    const result = await models.restaurant.admin.data.detail(restaurantId)

    const businessCertificateFileUrl = result.businessCertificateFileKey
    const businessCertificateImageUrl = result.businessCertificateImageKey

    const createdAt = new Date(result.createdAt).toLocaleDateString('vi-VN')
    const businessCertificateFileKey = await CloudStorageProvider.getUrlS3(
        businessCertificateFileUrl
    )
    const businessCertificateImageKey = await CloudStorageProvider.getUrlS3(
        businessCertificateImageUrl
    )
    // check ngày và time mở cửa
    const isOpen = await checkIsOpenRestaurant(
        result.openDays,
        result.openTime,
        result.closeTime
    )

    const data = {
        ...result,
        createdAt,
        businessCertificateFileKey,
        businessCertificateImageKey,
        isOpen: isOpen
    }
    return data
}
