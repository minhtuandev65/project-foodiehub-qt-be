import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import { templates } from '~/template'
import ApiError from '~/utils/ApiError'
import { RESTAURANT_STATUS } from '~/utils/constants'

export const table = async (tableRequest, t) => {
    const {tableId, imageURL, ...rest } = tableRequest
    const existRestaurant = await models.table.find.id(tableId)
    if (!existRestaurant)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    if (existRestaurant.status === RESTAURANT_STATUS.PENDING)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('managers.waitAcceptRestaurant')
        )

   
    let uploadResultLogo = null
    if (imageURL) {
        imageURL = await CloudStorageProvider.uploadImageToS3(
            logoURL,
            'image-table'
        )
    }
    let newUpdateData = {
        uploadResultLogo,
        ...rest
    }
    const result = await models.table.manager.update.table(
        tableId,
        newUpdateData
    )
    // const restaurantUpdateMailTemplate =
    //     templates.restaurant.restaurantUpdateTemplate({
    //         email,
    //         name,
    //         isOwner
    //     })
    // ResendProvider.sendMail(
    //     email,
    //     'Restaurant Update Notification',
    //     restaurantUpdateMailTemplate
    // )
    return result
}
