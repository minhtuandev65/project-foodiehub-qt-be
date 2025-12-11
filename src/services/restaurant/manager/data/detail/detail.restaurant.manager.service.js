import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'
import { checkIsOpenRestaurant } from '~/utils/checkIsOpenRestaurant'

export const detail = async (restaurantId, userId) => {
    const existRestaurant = await models.restaurant.find.id(restaurantId)
    if (!existRestaurant) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    }
    const result = await models.restaurant.manager.data.detail(restaurantId)

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
    const isOpen = checkIsOpenRestaurant(
        result.openDays,
        result.openTime,
        result.closeTime
    )

    const count =
        (await models.restaurant.find.ratingByRestaurantId(restaurantId)) || 0
    const totalRating =
        (await models.restaurant.find.totalRatingByRestaurant(restaurantId)) ||
        0
    if (userId) {
        const existRating = await models.restaurant.find.ratingId({
            restaurantId,
            userId
        })
        const data = {
            ...result,
            createdAt,
            businessCertificateFileKey,
            businessCertificateImageKey,
            ratingAverage: totalRating / count,
            reviewCount: count,
            isOpen: isOpen,
            rating: existRating?.rating || null
        }
        return data
    }

    const data = {
        ...result,
        createdAt,
        businessCertificateFileKey,
        businessCertificateImageKey,
        ratingAverage: totalRating / count,
        reviewCount: count,
        isOpen: isOpen
    }
    return data
}
