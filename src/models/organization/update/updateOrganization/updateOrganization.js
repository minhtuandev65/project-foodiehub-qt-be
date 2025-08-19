import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {
    INVALID_UPDATE_FIELDS_ORGANIZATION,
    ORGANIZATION_COLLECTION_NAME
} from '~/helpers'

export const updateOrganization = async ({ organizationId, newUpdateData }) => {
    try {
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS_ORGANIZATION.includes(fieldName)) {
                delete newUpdateData[fieldName]
            }
        })
        const exist = await GET_DB()
            .collection(ORGANIZATION_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(organizationId), _destroy: false },
                { $set: { ...newUpdateData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
