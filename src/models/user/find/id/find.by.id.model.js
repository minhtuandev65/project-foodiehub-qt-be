import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (userId) => {
    console.log(userId)
    try {
        return await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .findOne({
                _id: new ObjectId(userId)
            })
    } catch (error) {
        throw new Error(error)
    }
}
