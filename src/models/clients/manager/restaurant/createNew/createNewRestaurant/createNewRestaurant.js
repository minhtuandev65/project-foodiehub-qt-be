import { ObjectId } from 'mongodb'

import { GET_DB } from '~/config/mongodb'
import { RESTAURANT_COLLECTION_NAME } from '~/helpers'
import { validateBeforeCreateRestaurant } from '../../validateBeforeCreateRestaurant/validateBeforeCreateRestaurant'


export const createNewRestaurant = async (newRestaurant) => {
    try {
        const valiData = await validateBeforeCreateRestaurant(newRestaurant)
        const dataToInsert = {
            ...valiData,
            ownerId: new ObjectId(valiData.ownerId),
            createdAt: new Date()
        }
        const exist = GET_DB()
            .collection(RESTAURANT_COLLECTION_NAME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
