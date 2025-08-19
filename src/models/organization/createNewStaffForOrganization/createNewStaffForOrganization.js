import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { ORGANIZATION_COLLECTION_NAME } from '~/helpers'

export const createNewStaffFOrOrganization = async ({
    userId,
    organizationId
}) => {
    try {
        const exist = await GET_DB()
            .collection(ORGANIZATION_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(organizationId), _destroy: false },
                {
                    $set: {
                        staffIds: new ObjectId(userId),
                        updatedAt: new Date()
                    }
                },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
