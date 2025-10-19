import { StatusCodes } from 'http-status-codes'
import { geocodeAddress } from '~/providers/geocodeAddress'
import ApiError from '~/utils/ApiError'
import { ResendProvider } from '~/providers/ResendProvider'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import { S3StorageCvFile } from '~/middlewares/S3StorageMiddleware/uploadFileS3'
import { models } from '~/models'
import { templates } from '~/template'

export const restaurant = async (newRestaurantData) => {
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

        const existUser = await models.auth.find.accountById(userId)
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

        const result =
            await models.restaurant.manager.create.restaurant(newRestaurant)

        const restaurantCreateMailTemplate =
            templates.restaurant.restaurantCreateNewTemplate({
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
