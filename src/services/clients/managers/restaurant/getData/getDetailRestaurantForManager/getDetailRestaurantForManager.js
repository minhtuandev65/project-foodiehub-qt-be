import { restaurantModels } from '~/models/restaurant'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const getDetailRestaurantForManager = async (restaurantId) => {
    try {
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

        const data = {
            ...result,
            createdAt,
            businessCertificateFileKey,
            businessCertificateImageKey
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}
