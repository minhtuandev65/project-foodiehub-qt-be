import { StatusCodes } from 'http-status-codes'
import { organizationModels } from '~/models/organization'
import ApiError from '~/utils/ApiError'
import { ORGIZATION_STATUS } from '~/utils/constants'

export const acceptCreateOrganization = async (organizationId) => {
    const existOrganization =
        await organizationModels.findOrganizationById(organizationId)
    console.log('existOrganization', existOrganization)
    if (!existOrganization)
        throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found!')
    const newUpdateData = {
        status: ORGIZATION_STATUS.ACCEPT,
        isActive: true
    }
    const result = await organizationModels.updateOrganization(
        existOrganization._id,
        newUpdateData
    )

    return result
}
