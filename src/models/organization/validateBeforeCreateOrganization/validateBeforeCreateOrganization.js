import { ORGANIZATION_COLLECTION_SCHEMA } from '../organizationModel/organizationModel'

export const validateBeforeCreateOrganization = async (data) => {
    return await ORGANIZATION_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
