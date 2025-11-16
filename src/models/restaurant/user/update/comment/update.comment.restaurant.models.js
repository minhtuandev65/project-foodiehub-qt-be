import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const comment = async (dataUpdate) => {
    const {commentId}=dataUpdate
    try {
        Object.keys(dataUpdate).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_COMMENT.includes(
                    fieldName
                )
            ) {
                delete dataUpdate[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.COMMENT_RESTAURANT)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(commentId),
                    _destroy: false
                },
                { $set: { ...dataUpdate, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
