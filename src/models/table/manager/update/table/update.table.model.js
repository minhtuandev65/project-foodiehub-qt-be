import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const table = async (tableId, newTable) => {
    try {
        Object.keys(newTable).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_TABLE.includes(
                    fieldName
                )
            ) {
                delete newTable[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(tableId),
                    _destroy: false
                },
                { $set: { ...newTable, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
        
    } catch (error) {
        throw new Error(error)
    }
}
