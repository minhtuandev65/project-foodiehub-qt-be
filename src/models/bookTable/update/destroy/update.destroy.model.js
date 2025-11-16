import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const destroy = async (tableId, data) => {
    try {
        Object.keys(data).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_DESTROY_FIELDS_BOOK_TABLE.includes(
                    fieldName
                )
            ) {
                delete data[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .findOneAndUpdate(
                {
                    tableId: new ObjectId(tableId),
                    _destroy: false
                },
                {
                    $set: {
                        ...data,
                        updatedAt: new Date()
                    }
                },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
