import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { ORGANIZATION_COLLECTION_NAME } from '~/helpers'
import { organizationModels } from '~/models/organization'
import { CloudStorageProvider } from '~/providers/CloudStorageProvider'
import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import organizationUpdateTemplate from '~/template/organization/organizationUpdateTemplate'
import ApiError from '~/utils/ApiError'

export const updateOrganization = async ({ userId, organizationData }) => {
    try {
        const { address, organizationId, logoURL } = organizationData
        const existOrganization =
            await organizationModels.findOrganizationById(organizationId)
        if (!existOrganization)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found!')

        if (!existOrganization.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Please wait for the administrator to approve the organization.'
            )
        const { email, name } = existOrganization
        const isOwner = new ObjectId(userId).equals(existOrganization.ownerId)
        let newUpdateData = {
            ...(organizationData || {})
        }

        if (address) {
            const { lat, lng } = await geocodeAddress(address)
            newUpdateData.lat = lat
            newUpdateData.lng = lng
        }
        if (logoURL) {
            const uploadResult = await CloudStorageProvider.streamUpload(
                logoURL.buffer,
                ORGANIZATION_COLLECTION_NAME
            )
            newUpdateData.logoURL = uploadResult.secure_url
        }
        const result = await organizationModels.updateOrganization({
            organizationId,
            newUpdateData
        })
        const organizationUpdateMailTemplate = organizationUpdateTemplate({
            email,
            name,
            isOwner
        })
        ResendProvider.sendMail(
            email,
            'Organization Update Notification',
            organizationUpdateMailTemplate
        )
        return result
    } catch (error) {
        throw Error(error)
    }
}
