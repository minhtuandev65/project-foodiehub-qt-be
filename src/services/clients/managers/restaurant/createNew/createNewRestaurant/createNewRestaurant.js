import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { geocodeAddress } from '~/providers/geocodeAddress'
import ApiError from '~/utils/ApiError'

import { ResendProvider } from '~/providers/ResendProvider'
import restaurantCreateNewTemplate from '~/template/restaurant/restaurantCreateNewTemplate'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import { S3StorageCvFile } from '~/middlewares/S3StorageMiddleware/uploadFileS3'
import { restaurantModels } from '~/models/clients/manager/restaurant'

export const createNewRestaurant = async (newRestaurantData) => {
    try {
        const {
            userId,
            address,
            name,
            logoURL,
            businessCertificateImage,
            businessCertificateFile,
            ...rest
        } = newRestaurantData

        const existUser = await authModels.findAccountById(userId)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Please active your account!'
            )
        const email = existUser.email

        const { lat, lng } = await geocodeAddress(address)

        const uploadResultLogo = await CloudStorageProvider.uploadImageToS3(
            logoURL,
            'logo-restaurant'
        )

        const businessCertificateFileKey =
            await S3StorageCvFile.streamUploadFile(
                businessCertificateFile,
                'business-certificate-file'
            )
        const businessCertificateImageKey =
            await CloudStorageProvider.uploadImageToS3(
                businessCertificateImage,
                'business-certificate-image'
            )

        const newRestaurant = {
            ownerId: userId,
            name,
            description: newRestaurantData.description,
            logoURL: uploadResultLogo.url,
            email,
            phone: newRestaurantData.phone,
            address,
            lat,
            lng,
            businessCertificateFileKey: businessCertificateFileKey.key,
            businessCertificateImageKey: businessCertificateImageKey.key,
            ...rest
        }

        const result = await restaurantModels.createNewRestaurant(newRestaurant)

        const restaurantCreateMailTemplate = restaurantCreateNewTemplate({
            email,
            name
        })

        ResendProvider.sendMail(
            email,
            'Restaurant Registration Successful',
            restaurantCreateMailTemplate
        )

        return { _id: result.insertedId, ...newRestaurant }
    } catch (error) {
        throw Error(error)
    }
}
