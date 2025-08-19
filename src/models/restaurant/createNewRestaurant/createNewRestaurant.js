import { ObjectId } from 'mongodb'
import { validateBeforeCreateRestaurant } from '../validateBeforeCreateRestaurant/validateBeforeCreateRestaurant'
import { GET_DB } from '~/config/mongodb'
import { RESTAURANT_COLLECTION_NAME } from '~/helpers'

export const createNewRestaurant = async (newRestaurant) => {
    try {
        const valiData = await validateBeforeCreateRestaurant(newRestaurant)
        const dataToInsert = {
            ...valiData,
            organizationId: new ObjectId(valiData.organizationId)
        }
        const exist = GET_DB()
            .collection(RESTAURANT_COLLECTION_NAME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
