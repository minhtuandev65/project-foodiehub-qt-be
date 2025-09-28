import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { organizationModels } from '~/models/organization'
import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import organizationCreateNewTemplate from '~/template/restaurant/restaurantCreateNewTemplate'
import ApiError from '~/utils/ApiError'
import { uploadLogo } from '../../restaurant/upload/uploadLogo/uploadLogo'
import { uploadBusinessCertificateImage } from '../../restaurant/upload/uploadBusinessCertificateImage/uploadBusinessCertificateImage'
import { uploadBusinessCertificateFile } from '../../restaurant/upload/uploadBusinessCertificateFile/uploadBusinessCertificateFile'

export const createNewOrganization = async (newOrganizationData) => {
    try {
        const {
            userId,
            address,
            name,
            logoURL,
            businessCertificateImage,
            businessCertificateFile
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

        const newOrganization = {
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
            businessCertificateImageKey
        }

        const result =
            await organizationModels.createNewOrganization(newOrganization)

        const organizationCreateMailTemplate = organizationCreateNewTemplate({
            email,
            name
        })

        ResendProvider.sendMail(
            email,
            'Organization Registration Successful',
            organizationCreateMailTemplate
        )

        return { _id: result.insertedId, ...newOrganization }
    } catch (error) {
        throw Error(error)
    }
}
