import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { geocodeAddress } from '~/providers/geocodeAddress'
import ApiError from '~/utils/ApiError'
import { uploadBusinessCertificateFile } from '../upload/uploadBusinessCertificateFile/uploadBusinessCertificateFile'
import { uploadBusinessCertificateImage } from '../upload/uploadBusinessCertificateImage/uploadBusinessCertificateImage'
import { uploadLogo } from '../upload/uploadLogo/uploadLogo'
import { restaurantModels } from '~/models/restaurant'
import { ResendProvider } from '~/providers/ResendProvider'
import restaurantCreateNewTemplate from '~/template/restaurant/restaurantCreateNewTemplate'

export const createNewOrganization = async (newOrganizationData) => {
    try {
        const {
            userId,
            address,
            name,
            logoURL,
            businessCertificateImage,
            businessCertificateFile,
            ...rest
        } = newOrganizationData
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

        const uploadResultLogo = await uploadLogo(logoURL)

        const businessCertificateFileKey = (
            await uploadBusinessCertificateFile(businessCertificateFile)
        ).key

        const businessCertificateImageKey = (
            await uploadBusinessCertificateImage(businessCertificateImage)
        ).key

        const newRestaurant = {
            ownerId: userId,
            name,
            description: newOrganizationData.description,
            logoURL: uploadResultLogo.url,
            email,
            phone: newOrganizationData.phone,
            address,
            lat,
            lng,
            businessCertificateFileKey,
            businessCertificateImageKey,
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
