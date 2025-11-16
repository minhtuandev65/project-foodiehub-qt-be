import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const bookTableId = async (bookTableId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CARTS)
            .findOne({
                bookTableId: new ObjectId(bookTableId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
