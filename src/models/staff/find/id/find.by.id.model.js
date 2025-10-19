import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (staffId) => {
    try {
        return await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.STAFF)
            .findOne({
                userId: new ObjectId(staffId)
            })
    } catch (error) {
        throw new Error(error)
    }
}
