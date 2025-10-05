
import { restaurantModels } from '~/models/clients/manager/restaurant'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import checkIsOpenRestaurant from '~/utils/checkIsOpenRestaurant'

export const getDetailRestaurantForManager = async (restaurantId) => {
    const result =
        await restaurantModels.getDetailRestaurantForManager(restaurantId)

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
