import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const table = async (tableId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(tableId),
                },
                { $set: {updatedAt: new Date(), _destroy: true } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
