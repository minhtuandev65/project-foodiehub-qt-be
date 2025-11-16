import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const commentId = async (commentId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.COMMENT_RESTAURANT)
            .findOne({
                _id: new ObjectId(commentId),
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
