import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { ORGANIZATION_COLLECTION_NAME } from '~/helpers'

export const createNewStaffFOrOrganization = async ({
    emailValue,
    organizationId
}) => {
    try {
        const exist = await GET_DB()
            .collection(ORGANIZATION_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(organizationId), _destroy: false },
                {
                    $push: { staffEmails: emailValue },
                    $set: { updatedAt: new Date() }
                },
                { returnDocument: 'after' }
            )
        return exist.value
    } catch (error) {
        throw new Error(error)
    }
}
