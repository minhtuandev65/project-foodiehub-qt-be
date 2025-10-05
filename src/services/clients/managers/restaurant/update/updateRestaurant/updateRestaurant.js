import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { restaurantModels } from '~/models/clients/manager/restaurant'

import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import restaurantUpdateTemplate from '~/template/restaurant/restaurantUpdateTemplate'
import ApiError from '~/utils/ApiError'
import { RESTAURANT_STATUS } from '~/utils/constants'

export const updateRestaurant = async (userId, restaurantData, t) => {
    const { address, restaurantId, logoURL, ...rest } = restaurantData
    const existRestaurant =
        await restaurantModels.findRestaurantById(restaurantId)
    if (!existRestaurant)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    if (userId !== existRestaurant.ownerId.toString()) {
        throw new ApiError(
            StatusCodes.FORBIDDEN,
            t('managers.notYourRestaurant')
        )
    }
    if (existRestaurant.status === RESTAURANT_STATUS.PENDING)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('managers.waitAcceptRestaurant')
        )
    const { email, name } = existRestaurant
    const isOwner = new ObjectId(userId).equals(existRestaurant.ownerId)

    if (address) {
        const { lat, lng } = await geocodeAddress(address)
        newUpdateData.lat = lat
        newUpdateData.lng = lng
    }
    let uploadResultLogo = null
    if (logoURL) {
        uploadResultLogo = await CloudStorageProvider.uploadImageToS3(
            logoURL,
            'logo-restaurant'
        )
    }
    let newUpdateData = {
        uploadResultLogo,
        ...rest
    }
    const result = await restaurantModels.updateRestaurant(
        restaurantId,
        newUpdateData
    )
    const restaurantUpdateMailTemplate = restaurantUpdateTemplate({
        email,
        name,
        isOwner
    })
    ResendProvider.sendMail(
        email,
        'Restaurant Update Notification',
        restaurantUpdateMailTemplate
    )
    return result
}
