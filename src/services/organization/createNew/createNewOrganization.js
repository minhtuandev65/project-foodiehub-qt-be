import { StatusCodes } from 'http-status-codes'
import { ORGANIZATION_COLLECTION_NAME } from '~/helpers'
import { authModels } from '~/models/auth'
import { organizationModels } from '~/models/organization'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider/businessCertificateFile'
import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import organizationCreateNewTemplate from '~/template/organization/organizationCreateNewTemplate'
import ApiError from '~/utils/ApiError'

export const createNewOrganization = async (newOrganizationData) => {
    try {
        const { ownerId, address, name, logoURL } = newOrganizationData
        const existUser = await authModels.findAccountById(ownerId)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Please active your account!'
            )

        const email = existUser.email
        const { lat, lng } = await geocodeAddress(address)

        let newOrganization = {
            ...newOrganizationData,
            email,
            name,
            lat,
            lng,
            ownerId
        }

        if (logoURL) {
            const uploadResult = await CloudStorageProvider.streamUpload(
                logoURL.buffer,
                ORGANIZATION_COLLECTION_NAME
            )
            newOrganization = {
                ...newOrganization,
                logoURL: uploadResult.secure_url
            }
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
