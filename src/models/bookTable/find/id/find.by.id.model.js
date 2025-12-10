import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (bookTableId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .findOne({
                _id: new ObjectId(bookTableId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
