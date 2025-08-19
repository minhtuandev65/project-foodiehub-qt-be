import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { ORGANIZATION_COLLECTION_NAME } from '~/helpers'

export const findOrganizationById = async (organizationId) => {
    try {
        const exist = await GET_DB()
            .collection(ORGANIZATION_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(organizationId) })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
