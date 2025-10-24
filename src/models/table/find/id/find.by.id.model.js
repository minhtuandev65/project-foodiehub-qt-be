import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (tableId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .findOne({
                _id: new ObjectId(tableId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
