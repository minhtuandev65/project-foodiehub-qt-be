import { ObjectId } from 'mongodb'
import { validateBeforeCreateOrganization } from '../validateBeforeCreateOrganization/validateBeforeCreateOrganization'
import { GET_DB } from '~/config/mongodb'
import { ORGANIZATION_COLLECTION_NAME } from '~/helpers'

export const createNewOrganization = async (newOrganization) => {
    try {
        const validData =
            await validateBeforeCreateOrganization(newOrganization)
        const dataToInsert = {
            ...validData,
            ownerId: new ObjectId(validData.ownerId)
        }
        const exist = GET_DB()
            .collection(ORGANIZATION_COLLECTION_NAME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
