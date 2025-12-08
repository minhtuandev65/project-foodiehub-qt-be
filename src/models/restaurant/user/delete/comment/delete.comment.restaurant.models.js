import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const comment = async (commentId, userId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.COMMENT_RESTAURANT)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(commentId),
                },
                {
                    $set: {
                        updatedAt: new Date(),
                        _destroy: true
                    }
                },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
