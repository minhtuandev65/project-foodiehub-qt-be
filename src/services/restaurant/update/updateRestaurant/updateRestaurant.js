import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { RESTAURANT_COLLECTION_NAME } from '~/helpers'
import { restaurantModels } from '~/models/restaurant'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider/businessCertificateFile/businessCertificateFile'
import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import restaurantUpdateTemplate from '~/template/restaurant/restaurantUpdateTemplate'
import ApiError from '~/utils/ApiError'
import { RESTAURANT_STATUS } from '~/utils/constants'

export const updateRestaurant = async (userId, restaurantData) => {
    try {
        const { address, restaurantId, logoURL } = restaurantData
        const existRestaurant =
            await restaurantModels.findRestaurantById(restaurantId)
        if (!existRestaurant)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found!')

        if (existRestaurant.status === RESTAURANT_STATUS.PENDING)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Please wait for the administrator to accept the restaurant.'
            )
        const { email, name } = existRestaurant
        const isOwner = new ObjectId(userId).equals(existRestaurant.ownerId)
        let newUpdateData = {
            ...(restaurantData || {})
        }

        if (address) {
            const { lat, lng } = await geocodeAddress(address)
            newUpdateData.lat = lat
            newUpdateData.lng = lng
        }
        if (logoURL) {
            const uploadResult = await CloudStorageProvider.streamUpload(
                logoURL.buffer,
                RESTAURANT_COLLECTION_NAME
            )
            newUpdateData.logoURL = uploadResult.secure_url
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
    } catch (error) {
        throw Error(error)
    }
}
